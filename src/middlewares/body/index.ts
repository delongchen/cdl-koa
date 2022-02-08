import { parseBody } from './parseBody'
import yaml from 'yaml'
import toml from 'toml'
import {writeBody} from "./writeBody";

export const parseJSON = parseBody(data => JSON.parse(data))
export const parseYAML = parseBody(data => yaml.parse(data))
export const parseTOML = parseBody(data => toml.parse(data))

export const writeJSON = writeBody(data => JSON.stringify(data))
export const writeYAML = writeBody(data => yaml.stringify(data))
