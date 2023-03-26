type EnumType = { [s: number]: string }

export default function mapEnum(enumType: EnumType) {
  return Object.keys(enumType) as Array<string>
}
