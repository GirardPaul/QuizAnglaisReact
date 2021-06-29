import './App.css';
import words from './data.json';
import React, {useEffect, useState} from "react";
import List from './List';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery';
import 'bootstrap/dist/js/bootstrap';
import $ from 'jquery';

function App() {

    const [data, setData] = useState({})
    const [enableDisabled, setEnableDisabled] = useState(true);

    useEffect((event) => {
        setData(words);
    }, []);


    const setDataToParents = (value, wordFrench, e) => {
        let index = 0;
        const elements = data;

        for (index = 0; index < elements.words.length; index++) {
            if (elements.words[index].nameFrench === wordFrench) {
                break;
            }
        }

        if (e.target.value) {
            elements.words[index].clientResponse = e.target.value;
        } else {
            elements.words[index].clientResponse = "";

        }

        setData(elements);

        data.words.forEach(element => {
            if (element.clientResponse) {
                setEnableDisabled(false);
            } else {
                setEnableDisabled(true);
            }
        })
    }

    const handleClick = () => {

        $('.toast').toast('show')

        const errors = data.words.filter(word => word.answer !== word.clientResponse).length,
            score = 100 - errors;

        if (score === 100 || score >= 80) {
            document.querySelector('.toast-body').innerHTML = 'Vous avez la note de A, vous avez un score de ' + score + '/100';
        } else if (score === 79 || score >= 60) {
            document.querySelector('.toast-body').innerHTML = 'Vous avez la note de B, vous avez un score de ' + score + '/100';
        } else if (score === 59 || score >= 40) {
            document.querySelector('.toast-body').innerHTML = 'Vous avez la note de C, vous avez un score de ' + score + '/100';
        } else if (score <= 39) {
            document.querySelector('.toast-body').innerHTML = 'Vous avez la note de D, vous avez un score de ' + score + '/100';
        }

        const select = document.querySelectorAll('select');

        select.forEach(element => {
            data.words.forEach(items => {
                if (element.id === items.nameFrench) {
                    if (element.value === items.answer) {
                        let validResponse = document.createElement('p');
                        validResponse.innerHTML = 'Bonne réponse : ' + items.answer;
                        validResponse.style.color = 'green';
                        element.parentNode.insertBefore(validResponse, element);
                        element.selectedIndex = 0;
                    } else if (element.value !== items.answer) {
                        console.log(element.value, items.answer)
                        let invalidResponse = document.createElement('p');
                        invalidResponse.innerHTML = 'Mauvaise réponse : ' + element.value;
                        invalidResponse.style.color = 'red';
                        element.parentNode.insertBefore(invalidResponse, element);
                        let validResponse = document.createElement('p');
                        validResponse.innerHTML = 'La bonne réponse était : ' + items.answer;
                        validResponse.style.color = 'green';
                        element.parentNode.insertBefore(validResponse, invalidResponse);
                        element.selectedIndex = 0;

                    }
                }
            })
        })

        setData(words);
    }

    const resetResponse = () => {
        document.querySelectorAll('p').forEach(element => {
            element.remove()
        })
        document.querySelectorAll('select').forEach(element => {
            element.selectedIndex = 0
        })
    }

    return (
        <div className="container">
            <div aria-live="polite" aria-atomic="true">
                <div data-delay={5000} className="toast" style={{position: "fixed", top: 0, right: 0}}>
                    <div className="toast-header">
                        <img src="..." className="rounded mr-2" alt=""/>
                        <strong className="mr-auto">Résultats</strong>
                        <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="toast-body">
                    </div>
                </div>
            </div>
            <List setDataToParents={setDataToParents} data={data}/>
            <div className="d-flex">

                <input className="btn-primary" onClick={resetResponse} type="button" value="Réinitialiser"/>
                <input className="btn-primary ml-3" id="button-verification" type="button"
                       disabled={enableDisabled}
                       onClick={handleClick} value="Vérification"/>
            </div>

        </div>


    )
        ;
};


export default App;
