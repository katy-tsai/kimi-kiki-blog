/**
 * Type declarations for plantuml-encoder package
 *
 * The plantuml-encoder package provides functions to encode and decode
 * PlantUML diagrams for use with PlantUML servers.
 */

declare module 'plantuml-encoder' {
  /**
   * Encodes PlantUML source code to URL-safe string
   *
   * @param source - PlantUML source code (with or without @startuml/@enduml tags)
   * @returns URL-safe encoded string that can be used in PlantUML server URLs
   *
   * @example
   * ```typescript
   * import plantumlEncoder from 'plantuml-encoder'
   *
   * const encoded = plantumlEncoder.encode('@startuml\nAlice -> Bob\n@enduml')
   * // Use in URL: https://www.plantuml.com/plantuml/svg/${encoded}
   * ```
   */
  export function encode(source: string): string

  /**
   * Decodes URL-safe string back to PlantUML source code
   *
   * @param encoded - URL-safe encoded string
   * @returns Original PlantUML source code
   *
   * @example
   * ```typescript
   * import plantumlEncoder from 'plantuml-encoder'
   *
   * const source = plantumlEncoder.decode(encoded)
   * ```
   */
  export function decode(encoded: string): string

  // Default export provides both encode and decode functions
  const plantumlEncoder: {
    encode: typeof encode
    decode: typeof decode
  }

  export default plantumlEncoder
}
