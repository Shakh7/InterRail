<!-- <template>
    <div class="mb-3">
        <label for="trainName" class="form-label mt-0 pt-0">Train Name</label>
        <input v-if="action === 'edit'" type="text" class="form-control" id="trainName"
            :value="trainData.name.toString().toUpperCase()" disabled>
        <input v-if="action === 'create'" type="text" class="form-control" id="trainName" v-model="newTrainName">
    </div>

    <div>
        <label for="basiInput" class="form-label">Excel File</label>
        <DropZone @change="selectedFile" @drop="drop" />
        <ul class="list-unstyled mb-0 mt-3 mb-3" id="dropzone-preview">
            <div class="border rounded" v-for="(file, index) of files" :key="index">
                <div class="d-flex p-2">
                    <div class="flex-grow-1">
                        <div class="pt-1">
                            <h5 class="fs-14 mb-1" data-dz-name="">
                                {{ file.name }}
                            </h5>
                            <p class="fs-13 text-muted mb-0" data-dz-size="">
                                <strong> {{ file.size / 1024 }} </strong> KB
                            </p>
                            <strong class="error text-danger" data-dz-errormessage=""></strong>
                        </div>
                    </div>
                    <div class="flex-shrink-0 ms-3">
                        <button data-dz-remove="" class="btn btn-sm btn-danger" @click="deleteRecord">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </ul>

        <b-button variant="secondary" v-if="action === 'edit'" class="w-100" @click="stratUploading"
            :class="files.length === 0 ? 'disabled' : ''">
            Start Uploading </b-button>

        <b-button variant="secondary" v-if="action === 'create'" class="w-100"
            :class="newTrainName === '' || newTrainName === null || files.length === 0 ? 'disabled' : '0'"
            @click="stratUploading">
            Start Uploading </b-button>
    </div>
</template>

<script>
import DropZone from "@/components/widgets/dropZone";
import readXlsxFile from "read-excel-file";
import axios from "axios";
import Swal from "sweetalert2";

export default {
    name: 'SmgsModalBody',
    emits: {
        readyExcelData: null,
    },
    data() {
        return {
            files: [],
            dropzoneFile: null,
            excelData: {
                rus: null,
                en: null
            },
            newTrainName: null
        }
    },
    props: {
        action: {
            type: String,
            default: 'create'
        },
        trainData: {
            type: Object,
            default: () => { }
        },
        previewConfirmed: {
            type: Boolean,
            default: () => false
        }
    },
    components: {
        DropZone
    },
    methods: {
        drop(e) {
            this.deleteRecord()
            this.dropzoneFile.value = e.this.dataTransfer.files[0];
            this.files.value.push(this.dropzoneFile.value);
        },

        isValidExcel(rows) {
            let conditionsToBeValid = [
                null,
                "НОМЕР SMGS",
                "СТАНЦИЯ ОТПРАВЛЕНИЯ",
                "ЗАЯВЛЕНИЯ ОТПРАВИТЕЛЯ",
                "СТАНЦИЯ НАЗНАЧЕНИЯ",
                "ПОГРАНИЧНЫЕ СТАНЦИИ ПЕРЕХОДОВ",
                "ВАГОН",
                "КОНТЕЙНЕР СОБСТВЕННОСТИ",
                "ПОГРУЖЕНО",
                "СПОСОБ ОПРЕДЕЛЕНИЯ МАССЫ",
                "ПЕРЕВОЗЧИКИ(УЧАСТКИ)",
                "КОДЫ ПО УТИ",
                "КОДЫ ПО КЗХ",
                "КОДЫ ПО КЖД",
                "Информация. не предназначенная для перевозчика. № договора  по поставку",
                "ОТПРАВИТЕЛЬ",
                "ПОЛУЧАТЕЛЬ",
                "НАИМЕНОВАНИЕ ГРУЗА",
                "НОМЕР КОНТЕЙНЕРА",
                "ТИП КНТР",
                "ТИП G1",
                "ТАРА КОНТЕЙНЕРА",
                "РОД УПАКОВКИ",
                "К-ВО МЕСТ",
                "НЕТТО",
                "ТАРА",
                "БРУТТО",
                "К-ВО",
                "ЗНАКИ",
                "Документы. приложенные отправителем",
                "ТЖ ПЛОМБА",
                "ИМЯ ИНСПЕКТОРА",
                "Дата"
            ]
            let filtered = Array.from(rows[0]).filter(h => conditionsToBeValid.includes(h) === true);
            let isValid = filtered.length === conditionsToBeValid.length
            return isValid
        },

        async selectedFile() {
            this.deleteRecord()
            this.excelData.rus = []
            let file = document.querySelector(".dropzoneFile").files[0]
            if (file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
                this.files.push(file);
                let rows = await readXlsxFile(this.files[0])
                if (this.isValidExcel(rows)) {
                    this.excelData.rus = rows
                    this.sendExcelData(rows)
                } else {
                    this.deleteRecord()
                    Swal.fire({
                        position: "center",
                        icon: "warning",
                        title: "Invalid Excel Data",
                        showConfirmButton: false,
                        timer: 3000,
                    });
                }

            } else {
                Swal.fire({
                    position: "center",
                    icon: "warning",
                    title: "Form Accepts Only Excel File",
                    showConfirmButton: false,
                    timer: 3000,
                });
            }
        },

        deleteRecord() {
            this.files.length = 0
        },

        sendExcelData(rows) {
            this.$emit('readyExcelData', rows)
        },

        async stratUploading() {

            this.excelData.en = []

            for (let row of this.excelData.rus.slice(1, this.excelData.rus.length)) {
                let r = JSON.parse(JSON.stringify(row))

                let excel_data = {
                    railway_code: null,
                    sender: null,
                    departure_station: null,
                    sender_statement: null,
                    recipient: null,
                    destination_station: null,
                    border_crossing_stations: null,
                    railway_carriage: null,
                    shipping_name: null,
                    container_owner: null,
                    container: null,
                    container_type: null,
                    container_type_code: null,
                    type_of_packaging: null,
                    number_of_seats: null,
                    net: null,
                    tara: null,
                    gross: null,
                    seals: null,
                    seal_quantity: null,
                    submerged: null,
                    method_of_determining_mass: null,
                    payment_of_legal_fees: null,
                    carriers: null,
                    documents_by_sender: null,
                    additional_information: null,
                    custom_seal: null,
                    inspector_name: null,
                    date: null,
                    train_name: null,
                }

                for (let [i, value] of r.entries()) {
                    let headers = JSON.parse(JSON.stringify(this.excelData.rus.slice(0, 1)[0]))

                    switch (headers[i]) {
                        case 'НОМЕР SMGS':
                            excel_data.railway_code = value === null ? '' : value
                            break;
                        case 'ОТПРАВИТЕЛЬ':
                            excel_data.sender = value === null ? '' : value
                            break;
                        case 'СТАНЦИЯ ОТПРАВЛЕНИЯ':
                            excel_data.departure_station = value === null ? '' : value
                            break;
                        case 'ЗАЯВЛЕНИЯ ОТПРАВИТЕЛЯ':
                            excel_data.sender_statement = value === null ? '' : value
                            break;
                        case 'ПОЛУЧАТЕЛЬ':
                            excel_data.recipient = value === null ? '' : value
                            break;
                        case 'СТАНЦИЯ НАЗНАЧЕНИЯ':
                            excel_data.destination_station = value === null ? '' : value
                            break;
                        case 'ПОГРАНИЧНЫЕ СТАНЦИИ ПЕРЕХОДОВ':
                            excel_data.border_crossing_stations = value === null ? '' : value
                            break;
                        case 'ВАГОН':
                            excel_data.railway_carriage = value === null ? '' : value
                            break;
                        case 'НАИМЕНОВАНИЕ ГРУЗА':
                            excel_data.shipping_name = value === null ? '' : value
                            break;
                        case 'КОНТЕЙНЕР СОБСТВЕННОСТИ':
                            excel_data.container_owner = value === null ? '' : value
                            break;
                        case 'РОД УПАКОВКИ':
                            excel_data.type_of_packaging = value === null ? '' : value
                            break;
                        case 'К-ВО МЕСТ':
                            excel_data.number_of_seats = value === null ? '' : value
                            break;
                        case 'НЕТТО':
                            excel_data.net = value === null ? '' : value
                            break;
                        case 'ТАРА КОНТЕЙНЕРА':
                            excel_data.tara = value === null ? '' : value
                            break;
                        case 'БРУТТО':
                            excel_data.gross = value === null ? '' : value
                            break;
                        case 'ЗНАКИ':
                            excel_data.seals = value === null ? '' : value
                            break;
                        case 'К-ВО':
                            excel_data.seal_quantity = value === null ? '' : value
                            break;
                        case 'ПОГРУЖЕНО':
                            excel_data.submerged = value === null ? '' : value
                            break;
                        case 'СПОСОБ ОПРЕДЕЛЕНИЯ МАССЫ':
                            excel_data.method_of_determining_mass = value === null ? '' : value
                            break;
                        case 'КОДЫ ПО УТИ':
                            excel_data.payment_of_legal_fees = value === null ? '' : value
                            break;
                        case 'ПЕРЕВОЗЧИКИ(УЧАСТКИ)':
                            excel_data.carriers = value === null ? '' : value
                            break;
                        case 'Документы. приложенные отправителем':
                            excel_data.documents_by_sender = value === null ? '' : value
                            break;
                        case 'Информация. не предназначенная для перевозчика. № договора  по поставку':
                            excel_data.additional_information = value === null ? '' : value
                            break;
                        case 'ТЖ ПЛОМБА':
                            excel_data.custom_seal = value === null ? '' : value
                            break;
                        case 'ИМЯ ИНСПЕКТОРА':
                            excel_data.inspector_name = value === null ? '' : value
                            break;
                        case 'НОМЕР КОНТЕЙНЕРА':
                            excel_data.container = value === null ? '' : value
                            break;
                        case 'ТИП КНТР':
                            excel_data.container_type = value === null ? '' : value
                            break;
                        case 'ТИП G1':
                            excel_data.container_type_code = value === null ? '' : value
                            break;
                        case 'Дата':
                            excel_data.date = value === null ? '' : value
                            break;
                        default:
                            break;
                    }
                }

                excel_data.train_name = this.trainData.name

                this.excelData.en.push(excel_data)
            }

            try {
                let deleteRequest = await fetch(`https://fastapi-smgs.herokuapp.com/api/v1/smgs/train_smgs/${this.trainData.id}`, {
                    method: 'DELETE',
                })
                console.log(deleteRequest)
            } catch {
                alert('deleteRequest')
            }

            Array.from(this.excelData.en).forEach(async (item) => {
                let response = await fetch('https://fastapi-smgs.herokuapp.com/api/v1/smgs/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(item)
                })
                console.log(await response.json())
            })

            try {
                
                var formData = new FormData();
                formData.append("file", this.files[0]);
                axios
                    .post(`http://fastapi-smgs.herokuapp.com/api/v1/train/uploadfile/?pk=${this.trainData.id}`, formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    })
                    .then((response) => {
                        console.log(response)
                    })

            } catch {
                alert('postExel')
            }
        }
    },
    watch: {
        action() {
            this.files.length = 0
        },
    }
}
</script> -->