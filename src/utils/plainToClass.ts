export default function plainToClass<T>(jsonArray: unknown[], typedClass: { new(props: any): T }): T[] {
    return jsonArray.map((jsonObject) =>  new typedClass(jsonObject))
  }