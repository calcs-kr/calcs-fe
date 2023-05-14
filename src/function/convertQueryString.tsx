// 문자열을 Query String 형태로 변환
export function convertStringToQueryString(name: string, data: string) {
    return `&${name}=${data}`
}

// 배열을 Query String 형태로 변환
export function convertArrayToQueryString(name: string, array: Array<string|null>) {
    return array.map((item) => `&${name}=${item}`).join('')
}

export function deleteStringToQueryString(name: string, array: string, data: string) {
    return data.replace(`&${name}=${data}`, ``)
}