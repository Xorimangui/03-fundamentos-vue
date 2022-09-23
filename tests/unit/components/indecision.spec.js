import { shallowMount } from "@vue/test-utils"
import Indecision from '@/components/Indecision.vue'

describe('Indecision Component', () => {

    let wrapper
    let clgSpy

    beforeEach(() => {
        wrapper = shallowMount(Indecision)

        clgSpy = jest.spyOn(console, 'log') // espía cualquier cambio en el objeto console y en su metodo log

    })

    test('Debe de hacer match con el snapshot', () => {

        // console.log(wrapper.html())
        expect(wrapper.html()).toMatchSnapshot()

    })

    test('Escribir en el input no debe de disparar nada (console.log)', async() => {

        const getAnswerSpy = jest.spyOn(wrapper.vm, 'getAnswer') //funcion espía. El .vm sirve para poder acceder a los metodos del wrapper

        const input = wrapper.find('input')
        await input.setValue('Hola Mundo') // Usamos await porque estamos cambiando un valor del DOM, hay que esperar a que se renderice

        expect(clgSpy).toHaveBeenCalledTimes(1) //prueba si se ha llamado al clgSpy, que esta pendiente del objeto console y su metodo log
        expect(getAnswerSpy).not.toHaveBeenCalled() //observamos si el metodo getAnswerSpy no se ha llamado ni una vez.

    })

    test('Escribir el simbolo de "?" debe de disparar el getAnswer', async() => {

        const getAnswerSpy = jest.spyOn(wrapper.vm, 'getAnswer')

        const input = wrapper.find('input')
        await input.setValue('Hola Mundo?')

        expect(getAnswerSpy).toHaveBeenCalled()

    })

    test('Pruebas en getAnswer()', () => {



    })

    test('Pruebas en getAnwer() - Fallo en el API', () => {



    })
})