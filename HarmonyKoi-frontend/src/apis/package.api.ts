import { PackageResponse } from '../types'
import http from '../utils/http'

export const getPackage = async () => await http.get<PackageResponse>('/packages')
