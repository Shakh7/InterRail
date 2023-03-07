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
    let response = await axios.get(url + '/companies/' + companyName + '/')
    return validateResponse(response)
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
    let headers = new Headers();
    headers.append("Content-Type", `application/json`);
    let response = await axios.put(url + '/contract-acts/' + act.id,
        {
            name: act.name,
            file: act.file,
            contract: act.contract,
            comment: act.comment,
        }, {headers: headers}
    )
    return validateResponse(response)
}