// HTML Events employee service.js

const saveTrainer = () =>{

    console.log('Save Called');

    // create Trainer Service Object

    const trn = new trainer();

    trn.setup(

        document.getElementById('eId').value,

        document.getElementById('eName').value,

        document.getElementById('eEmail').value,

        document.getElementById('eSpecialization').value

        );

    // SAVE Trainer

    trn._add();

    fetchAllTrainers();

}



const fetchAllTrainers = ()=>{

    document.getElementById('eEmail').removeAttribute('readonly');

    const trn = new trainer();

    const trainers = trn._all();

    buildTrainerTable(trainers);

    

}

// edit 

const editTrainer = (eSpecialization) =>{

    const trn = new trainer();

    let trnFound = trn._update(eSpecialization);

    document.getElementById('eId').value = trnFound.eId;

    document.getElementById('eName').value = trnFound.eName;

    document.getElementById('eSpecialization').value = trnFound.eDesignation;

    // make eId read only

    document.getElementById('eId').setAttribute('readonly',true);

}

const buildTrainerTable = (trainers) =>{

    const trnBody = document.getElementById('trn-details');

    let rows = '';

    trainers.forEach((trn)=>{

        rows += `<tr>

                    <td>${trn.eId}</td>

                    <td>${trn.eName}</td>

                    <td>${trn.eSpecialization}</td>

                    <td><a href='#' onclick="deleteTrainer('${trn.eId}')">Delete</a></td>

                    <td><a href='#' onclick="editTrainer('${trn.eId}')">Edit</a></td>

                </tr>`

    });

    trnBody.innerHTML = rows;

    if(rows !=''){

        document.getElementById('tbl-trainer').style.visibility = 'visible';

    }else{

        document.getElementById('tbl-trainer').style.visibility = 'hidden';

    }

}

const deleteTrainer = (eId)=>{

    const trn = new trainer();

    trn._delete(eId);

    const trainers = trn._all();

    buildTrainerTable(trnss);

}

class trainer {

    

    // setup method to configure attri

    setup(eId,eName,eSpecialization){

            this.eId = eId

            this.eName = eName

            this.eSpecialization = eSpecialization

    }



    // CRUD Operations



    _all(){

        const trainers = [];

        // fill up Array

        Object.keys(localStorage).forEach((storeKey)=>{

            trainers.push(JSON.parse(localStorage.getItem(storeKey)));

        });

        return trainers;

    }

    _filter(searchBy, criteria){

        let trainers = [];

        // fill up Array

            if(criteria !=null && searchBy == 'ID'){

                    Object.keys(localStorage).forEach((e)=>{

                        const _trn = JSON.parse(localStorage.getItem(e));

                        if(_trn.eId == criteria){

                            trainers.push(_trn);

                        }

                    });

                }

                else if(criteria !=null && searchBy == 'SPECI'){

                        Object.keys(localStorage).forEach((e)=>{

                            const _emp = JSON.parse(localStorage.getItem(e));

                            if(_trn.eSpecialization == criteria){

                                trainers.push(_trn);

                            }

                       });

            }

        return trainers;

    }

    _add(){

        localStorage.setItem(this.eId,JSON.stringify({

            eId : this.eId,

            eName: this.eName,

            eDesignation: this.eSpecialization
        }));

    }

    _update(eId){

        return JSON.parse(localStorage.getItem(eId));

    }

    _delete(eId){

        localStorage.removeItem(eId);

    }

}