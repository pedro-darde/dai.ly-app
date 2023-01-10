import axiosPlugin from "@/lib/axios";

export class BaseService {
    serviceName;

    constructor(serviceName) {
        this.serviceName = `/${serviceName}`
    }

    async edit(id, data) {
        await axiosPlugin.patch(`${this.serviceName}/${id}`, data)
    }

    async delete(id, extraProps) {
        await axiosPlugin.delete(`${this.serviceName}/${id}`, {
            data: extraProps
        })
    }

    async save(data) {
        await axiosPlugin.post(this.serviceName, data)
    }

    async list() {
        const {data} = await axiosPlugin.get(this.serviceName)
        return data
    }
}