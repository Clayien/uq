import qs from 'qs';
import { z } from 'zod';

export function encode<T>(data: T, options: qs.IStringifyOptions = { indices: false }): string {
	return qs.stringify(data, options);
}

export function parse<T extends z.ZodSchema>(
	params: URLSearchParams,
	schema: T,
	options: qs.IParseOptions = {}
): z.infer<T> {
	const result = qs.parse(params.toString(), options);

	return schema.parse(result);
}
