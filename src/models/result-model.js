class ResultModel {
    constructor(success, note, errors = null) {
        this.success = success
        this.note = note
        this.errors = errors
    }
}

class ResultDataModel extends ResultModel {
    constructor(success, note, data, errors = null) {
        super(success, note, errors)
        this.data = data
    }
}

module.exports = {
    ResultModel,
    ResultDataModel
}