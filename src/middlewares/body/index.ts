import { parseBody } from './parseBody'
import yaml from 'yaml'
import toml from 'toml'

export const parseJSON = parseBody(data => JSON.parse(data))
export const parseYAML = parseBody(data => yaml.parse(data))
export const parseTOML = parseBody(data => toml.parse(data))
