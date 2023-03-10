let url = '/customer'
import axios from "axios";

function validateResponse(response) {
    if (response.statusText === 'OK') {
        return response.data
    } else {
        return null
    }
}

export async function getCompanyByName(companyName) {

    let response = {
        ok: true,
        data: null
    };

    try {
        let res = await axios.get(url + '/companies/' + companyName + '/')
        response.data = res.data
    } catch (error) {
        response.ok = false
        response.data = error.response.data
    }
    return response
}

export async function updateCompany(company) {

    const req_url = url + '/companies/' + company.slug + '/';
    const formData = new FormData();

    formData.append('name', company.name);
    formData.append('slug', company.slug);
    formData.append('email', company.email);
    formData.append('phone', company.phone);
    formData.append('address', company.address);

    let response = null;

    await axios.put(req_url, formData)
        .then(res => {
            response = validateResponse(res)
        })
        .catch(() => {
            return response
        })

    return response
}

export async function getContractsByCompanyId(companyId) {
    let response = await axios.get(url + '/contracts/' + companyId + '/by_company/')
    return validateResponse(response)
}

export async function getDocumentsByContractId(contractId) {
    let response = await axios.get(url + '/contract-documents/' + contractId + '/by_contract/')
    return validateResponse(response)
}

export async function getActsByContractId(contractId) {
    let response = await axios.get(url + '/contract-acts/' + contractId + '/by_contract/')
    return validateResponse(response)
}

export async function updateAct(act) {
    const req_url = url + '/contract-acts/' + act.id + '/';
    const formData = new FormData();

    formData.append('name', act.name);
    formData.append('contract', act.contract);
    formData.append('comment', act.comment);
    formData.append('file', act.file);
    let response = null;

    await axios.put(req_url, formData)
        .then(res => {
            response = validateResponse(res)
        })
        .catch(() => {
            return response
        })

    return response
}


export async function createAct(act) {
    const req_url = url + '/contract-acts/';
    const formData = new FormData();

    formData.append('name', act.name);
    formData.append('contract', act.contract);
    formData.append('comment', act.comment);
    formData.append('file', act.file);

    let response = await axios.post(req_url, formData)
    if (response.statusText === 'Created') {
        return response.data
    } else {
        return null
    }

}


export async function deleteActById(actId) {
    let response = await axios.delete(url + '/contract-acts/' + actId + '/')
    if (response.status === 204) {
        return response.data
    } else {
        return null
    }
}


// DOCUMENTS DOCUMENTS DOCUMENTS DOCUMENTS

export async function createDocument(doc) {
    const req_url = url + '/contract-documents/';
    const formData = new FormData();

    formData.append('name', doc.name);
    formData.append('contract', doc.contract);
    formData.append('comment', doc.comment);
    formData.append('file', doc.file);

    let response = {
        ok: true,
        data: null
    };

    try {
        let res = await axios.post(req_url, formData)
        response.data = res.data
    } catch (error) {
        response.ok = false
        response.data = error.response.data
    }

    return response
}

export async function updateDocument(doc) {
    const req_url = url + '/contract-documents/' + doc.id + '/';
    const formData = new FormData();

    formData.append('name', doc.name);
    formData.append('contract', doc.contract);
    formData.append('comment', doc.comment);
    formData.append('file', doc.file);
    let response = null;

    await axios.put(req_url, formData)
        .then(res => {
            response = validateResponse(res)
        })
        .catch(() => {
            return response
        })

    return response
}

export async function deleteDocumentById(documentId) {
    let response = await axios.delete(url + '/contract-documents/' + documentId + '/')
    if (response.status === 204) {
        return response.data
    } else {
        return null
    }

}


// CONTRACTS CONTRACTS CONTRACTS CONTRACTS

export async function updateContract(contract) {
    const req_url = url + '/contracts/' + contract.id + '/';
    const formData = new FormData();

    formData.append('name', contract.name);
    formData.append('company', contract.company);
    formData.append('start_date', contract.start_date);
    formData.append('expire_date', contract.expire_date);

    let response = null;

    await axios.put(req_url, formData)
        .then(res => {
            response = validateResponse(res)
        })
        .catch(() => {
            return response
        })

    return response
}

export async function deleteContractById(contractId) {
    let response = await axios.delete(url + '/contracts/' + contractId + '/')
    if (response.status === 204) {
        return response.data
    } else {
        return null
    }
}

export async function createContract(contract) {
    const req_url = url + '/contracts/';
    const formData = new FormData();

    formData.append('name', contract.name);
    formData.append('company', contract.company);
    formData.append('start_date', contract.start_date);
    formData.append('expire_date', contract.expire_date);

    let response = {
        ok: true,
        data: null
    };

    try {
        let res = await axios.post(req_url, formData)
        response.data = res.data
    } catch (error) {
        response.ok = false
        response.data = error.response.data
    }

    return response
}