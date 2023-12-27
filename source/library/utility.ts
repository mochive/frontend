export function getBitsPositions(number: number): number[] {
  const positions: number[] = [];
  let position: number = 1;

  while(number !== 0) {
    if(number & 1) {
      positions.push(position);
    }

    number >>= 1;
    position++;
  }

  return positions;
}

export function getQueryArray(query: string, offset: number = 0): number[] {
	let currentIndex: number = query.indexOf(',', offset);
	const array: number[] = [Number(query.slice(offset, currentIndex !== -1 ? currentIndex : undefined))];
	let lastIndex: number = currentIndex + 1;

	while(lastIndex !== 0) {
		currentIndex = query.indexOf(',', lastIndex);
		
		array.push(Number(query.slice(lastIndex,  currentIndex !== -1 ? currentIndex : undefined)));

		lastIndex = currentIndex + 1;
	}

	return array;
}

const encoder: TextEncoder = new TextEncoder();
const decoder: TextDecoder = new TextDecoder();

export function encodeBase64(text: string): string {
	return btoa(String.fromCharCode.apply(null, encoder.encode(text) as unknown as number[])).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

export function decodeBase64(text: string): string {
	const decodedCharacters: (string | number)[] = Array.from(atob(text.replace(/-/g, '+').replace(/_/g, '/')));

	for(let i: number = 0; i < decodedCharacters['length']; i++) {
		decodedCharacters[i] = (decodedCharacters[i] as string).charCodeAt(0);
	}

	return decoder.decode(new Uint8Array(decodedCharacters as number[]));
}