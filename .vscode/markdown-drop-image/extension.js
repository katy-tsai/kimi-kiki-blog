const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

/**
 * 啟動擴充功能
 *
 * Reason: 使用 DocumentDropEditProvider API 處理拖拉圖片事件
 */
function activate(context) {
    console.log('Markdown Drop Image extension is now active!');

    // Reason: 註冊拖拉編輯提供者，處理 Markdown 檔案的拖拉事件
    // 使用 id 和 dropMimeTypes 來覆蓋預設行為
    const provider = vscode.languages.registerDocumentDropEditProvider(
        { language: 'markdown' },
        {
            async provideDocumentDropEdits(_document, _position, dataTransfer, _token) {
                // Reason: 從 dataTransfer 取得拖拉的檔案
                const fileItems = dataTransfer.get('text/uri-list');
                if (!fileItems) {
                    console.log('No file items found in drop');
                    return;
                }

                const uriList = await fileItems.asString();
                console.log('Dropped URI list:', uriList);

                const uris = uriList.split('\r\n').filter(uri => uri && !uri.startsWith('#'));

                const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
                if (!workspaceFolder) {
                    vscode.window.showErrorMessage('無法找到工作區目錄');
                    return;
                }

                const projectRoot = workspaceFolder.uri.fsPath;
                const publicDir = path.join(projectRoot, 'public', 'images');

                // Reason: 確保目錄存在
                if (!fs.existsSync(publicDir)) {
                    fs.mkdirSync(publicDir, { recursive: true });
                }

                const snippets = [];

                for (const uriString of uris) {
                    const uri = vscode.Uri.parse(uriString);
                    const filePath = uri.fsPath;

                    console.log('Processing file:', filePath);

                    // Reason: 只處理圖片檔案
                    if (!/\.(png|jpg|jpeg|gif|webp)$/i.test(filePath)) {
                        console.log('Not an image file, skipping');
                        continue;
                    }

                    try {
                        // Reason: 建立時間戳檔名 (格式: screenshot-YYYY-MM-DD-HH-mm-ss)
                        const now = new Date();
                        const year = now.getFullYear();
                        const month = String(now.getMonth() + 1).padStart(2, '0');
                        const day = String(now.getDate()).padStart(2, '0');
                        const hour = String(now.getHours()).padStart(2, '0');
                        const minute = String(now.getMinutes()).padStart(2, '0');
                        const second = String(now.getSeconds()).padStart(2, '0');

                        const timestamp = `${year}-${month}-${day}-${hour}-${minute}-${second}`;
                        const ext = path.extname(filePath);
                        const baseFileName = `screenshot-${timestamp}`;

                        // Reason: 處理檔名重複，自動加序號
                        let newFileName = `${baseFileName}${ext}`;
                        let destPath = path.join(publicDir, newFileName);
                        let counter = 1;

                        while (fs.existsSync(destPath)) {
                            newFileName = `${baseFileName}-${counter}${ext}`;
                            destPath = path.join(publicDir, newFileName);
                            counter++;
                        }

                        // Reason: 複製圖片到目標目錄
                        fs.copyFileSync(filePath, destPath);

                        // Reason: 建立 Markdown 圖片語法 (Next.js 專案使用 /images/ 路徑)
                        const markdownPath = `/images/${newFileName}`;
                        snippets.push(`![](${markdownPath})`);

                        console.log('Image copied successfully:', markdownPath);
                        vscode.window.showInformationMessage(`🖼 已插入圖片：${markdownPath}`);
                    } catch (error) {
                        console.error('Error processing image:', error);
                        vscode.window.showErrorMessage(`複製圖片失敗：${error.message}`);
                    }
                }

                if (snippets.length === 0) {
                    return;
                }

                // Reason: 建立編輯結果，插入 Markdown 語法
                const snippet = new vscode.SnippetString(snippets.join('\n'));
                const edit = new vscode.DocumentDropEdit(snippet);
                return edit;
            }
        },
        {
            // Reason: 指定處理的 MIME 類型，並設定 ID 來覆蓋預設處理
            id: 'markdownDropImage',
            dropMimeTypes: ['text/uri-list']
        }
    );

    // Reason: 保留測試命令
    const command = vscode.commands.registerCommand('markdownDropImage.enable', () => {
        vscode.window.showInformationMessage('🪄 Markdown Drop Image 已啟用！拖拉圖片到 Markdown 檔案即可自動插入。');
    });

    context.subscriptions.push(provider, command);
}

function deactivate() {
    console.log('Markdown Drop Image extension is now deactivated.');
}

module.exports = { activate, deactivate };
