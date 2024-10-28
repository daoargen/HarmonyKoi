import { PackageResponse } from './../types/package.type'
import http from '../utils/http'

export const getPackage = async () => await http.get<PackageResponse>('/packages')
