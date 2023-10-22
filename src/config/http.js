import axios from 'axios'

export let http = axios.create({
    headers:{
        Accept:'*/*'
    }
})