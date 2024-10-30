import { Package, PackageResponse } from './../types/package.type'
import http from '../utils/http'

export const getPackage = async () => await http.get<PackageResponse>('/packages')

export const getPackageById = async (id: string) => await http.get<Package>(`/packages/${id}`)
