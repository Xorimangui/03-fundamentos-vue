import { shallowMount } from "@vue/test-utils"
import Indecision from '@/components/Indecision.vue'

describe('Indecision Component', () => {

    let wrapper
    let clgSpy

    // Complicado...para mas info: Mock del Fetch API en Google
    // Hace que todas las llamadas desde test sean de respuesta yes (?)
    global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve({
            answer: 'yes',
            forced: false,
            image: 'https://yesno.wtf/assets/yes/2.gif'
        })
    }))

    beforeEach(() => {
        wrapper = shallowMount(Indecision)

        clgSpy = jest.spyOn(console, 'log') // espía cualquier cambio en el objeto console y en su metodo log

        jest.clearAllMocks()

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

    test('Pruebas en getAnswer()', async() => {

        await wrapper.vm.getAnswer()

        const img = wrapper.find('img')

        expect(img.exists()).toBeTruthy()
        expect(wrapper.vm.img).toBe('https://yesno.wtf/assets/yes/2.gif')
        expect(wrapper.vm.answer).toBe('Si!')

    })

    test('Pruebas en getAnwer() - Fallo en el API', async() => {

        //Simulamos fallo en API

        fetch.mockImplementationOnce(() => Promise.reject('API is down'))

        //

        await wrapper.vm.getAnswer()

        const img = wrapper.find('img')

        expect(img.exists()).toBeFalsy() // esperamos que la imagen no exista
        expect(wrapper.vm.answer).toBe('No se pudo cargar del API')

    })
})