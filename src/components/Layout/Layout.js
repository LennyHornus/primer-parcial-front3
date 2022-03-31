// Importo React
import React, {Component} from 'react';
// Importo los datos del json
import data from "../../DATA/data.json";
// Importo los sub-componentes
import History from '../History/History.js';
import Options from "../Options/Options.js";
import PrevElection from "../PreviousElection/PrevElection.js";
// Importo sweet alert, para que queden mas bonitas las alertas
import Swal from "sweetalert2";



export class Layout extends Component {
    constructor(props){
        super(props);
        this.state = ({ step: 0, prevElections: [], lastAnswer: '', info: []});
    }


    componentDidMount(){
        this.setState({...this.state, info: data});
    }

    // Metodos --------------------------------------------------------------------------------------- //
    clickHandler = (e)=> {
        if (this.state.step >= 7 ) {
            this.finalAlert?.();
            return
        } 
        // Defino a que step debo pasar, y actualizo el state correspondientemente
        const numberToIncrease = this.defineStepNumber(e.target.value);
        this.updateState(numberToIncrease, e.target.value);
    }

    // Define cuanto debo aumentar el step
    defineStepNumber = (userElection)=>{
        const lastAnswer = this.state.lastAnswer;
        const step = this.state.step; 

        // Condiciones de la primera eleccion
        if (userElection === 'A' && step === 0) { return 1 }
        if (userElection === 'B' && step === 0) { return 2 }

        // Condiciones al elegir A
        if(userElection === 'A' && lastAnswer === 'A') { return 2 }
        if(userElection === 'A' && lastAnswer === 'B'){ return 1 }

        // Condiciones al elegir B
        if (userElection === 'B' && lastAnswer === 'A') { return 3 }
        if (userElection === 'B' && lastAnswer === 'B') { return 2 }
    }

    // Actualiza las propiedades del state
    updateState = (n, answer)=>{
        if (this.state.lastAnswer !== '') {
            this.setState({...this.state, step: this.state.step + n, lastAnswer: answer, prevElections: [...this.state.prevElections, answer]})
            return
        }
        this.setState({...this.state, step: this.state.step + n, lastAnswer: answer})
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('El componente se actualizo');
    }

    // Configuracion del alert final usando sweetAlert----------------------------------------------- //
    finalAlert = ()=> {
        Swal.fire({
            title: 'Felicidades, llegaste al final',
            text: 'Querés jugar de nuevo?',
            color: 'white',
            background: 'black',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            cancelButtonText: 'No'
          })
          // Si el usuario quiere jugar de nuevo, reinicio el state a su estado original
          .then((result) => {
            if (result.isConfirmed) {
                this.setState({step: 0, lastAnswer: '', prevElections: []})
            }
          })
    }

    render(){
        const Data = this.state.info[this.state.step] || data[0];
        return (
        <div className="layout">
            <History 
                text={Data.historia}
            />
            <Options 
                options={Data.opciones}
                handler={this.clickHandler}
            />
            <PrevElection 
                lastAnswer={this.state.lastAnswer} 
                prevElections={this.state.prevElections}
            />
        </div>
        );
    } 
}

export default Layout;