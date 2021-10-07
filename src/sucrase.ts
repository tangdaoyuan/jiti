import { transform as _transform, Transform } from 'sucrase'
import { TransformOptions, TRANSFORM_RESULT } from './types'

export default function transform (opts: TransformOptions): TRANSFORM_RESULT {
  const transforms: Transform[] = [
    'imports'
  ]
  if (opts.ts) {
    transforms.push('typescript')
  }
  try {
    const { code } = _transform(opts.source, {
      filePath: opts.filename,
      transforms
    })
    return { code, error: null }
  } catch (err: any) {
    return {
      error: err,
      code: 'exports.__JITI_ERROR__ = ' + JSON.stringify({
        filename: opts.filename,
        line: err.loc?.line || 0,
        column: err.loc?.column || 0,
        code: err.code,
        message: err.message
      })
    }
  }
}
