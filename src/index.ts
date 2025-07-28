import qs from 'qs';
import type { StandardSchemaV1 } from '@standard-schema/spec';

export function encode<T>(data: T, options: qs.IStringifyOptions = { indices: true }): string {
	return qs.stringify(data, options);
}

export async function parse<T extends StandardSchemaV1>(
	params: URLSearchParams,
	schema: T,
	options: qs.IParseOptions = {}
): Promise<StandardSchemaV1.InferOutput<T>> {
	const result = qs.parse(params.toString(), options);

	let parsedResult = schema['~standard'].validate(result);
	if (parsedResult instanceof Promise) parsedResult = await parsedResult;

	// if the `issues` field exists, the validation failed
	if (parsedResult.issues) {
		throw new Error(JSON.stringify(parsedResult.issues, null, 2));
	}

	return parsedResult.value;
}
