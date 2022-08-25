import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { trpc } from '../utils/trpc';


type PayableInterface = {
    service: string;
    description: string;
    expirationdate: Date;
    amount: number;
    status: string;
    barcode: string;
}

const schema = yup.object({
    service: yup.string().required(),
    description: yup.string().min(1).required(),
    expirationdate: yup.date().required(),
    amount: yup.number().required(),
    status: yup.string().required(),
    barcode: yup.string().min(3).required(),
})



export default function PayableForm() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<PayableInterface>({
        resolver: yupResolver(schema)
    });
    
    const utils = trpc.useContext();
    
    const addPost = trpc.useMutation('payables.add',{
        async onSuccess (){
            console.log('success');
            alert('success');
            await utils.invalidateQueries(['payables.getAll']);
            reset();
        },
        async onError (error){
            console.log(error);
            alert('Barcode already exists');
        }
    });
    
    /*
        const onSubmit: SubmitHandler<PayableInterface> = async (data) => {
        const input = {
            typeService: data.service,
            description: data.description,
            expirationDate: data.expirationdate,
            amount: data.amount,
            status: data.status,
            barcode: data.barcode,
        }

        await addPost.mutateAsync(input);
    }
    */ 

    //const addPost = trpc.useMutation('payables.add');
    
    const onSubmit =  handleSubmit(async data => {
        
        const input = {
            typeService: data.service,
            description: data.description,
            expirationDate: data.expirationdate,
            amount: data.amount,
            status: data.status,
            barcode: data.barcode,
        }
        try {
            await addPost.mutateAsync(input);
            
        } catch (error) {
            console.log(error);
        }
    }) 
    


    return (
        <>
            <div className='flex justify-center'>
                <div className='grid grid-cols-1 w-6/12'>
                    <form onSubmit={onSubmit}>
                        <div className='col-span-2 mb-1'>
                            <label className='form-label inline-block mb-2 text-gray-700'>Service</label>
                        </div>
                        <div className="mb-4">
                            <select className='
                                form-select form-control
                                block
                                w-full
                                px-3
                                py-1.5
                                text-base
                                font-normal
                              text-gray-700
                              bg-white bg-clip-padding
                                border border-solid border-gray-300
                                rounded
                                transition
                                ease-in-out
                                m-0
                              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                            {...register("service")}
                            >
                                <option value="">Seleccione una opción</option>
                                <option value="Luz">Luz</option>
                                <option value="Internet">Internet</option>
                                <option value="TV">TV</option>
                            </select>
                            {errors.service && <span className="text-red-500">{errors.service.message}</span>}
                        </div>
                        <div className='col-span-2 mb-1'>
                            <label className="form-label inline-block mb-2 text-gray-700">Description</label>
                        </div>
                        <div className="mb-4">
                            <input className='
                        form-input 
                        form-control
                        block
                        w-full
                        px-3
                        py-1.5
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding
                        border border-solid border-gray-300
                        rounded
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                        ' type="text" placeholder="Description" {...register("description", {})} />
                            {errors.description && <span className="text-red-500">{errors.description.message}</span>}
                        </div>
                        <div className='col-span-2 mb-1'>
                            <label className="form-label inline-block mb-2 text-gray-700">Expiration Date</label>
                        </div>
                        <div className="mb-4">
                            <input className='
                        form-input 
                        form-control
                        block
                        w-full
                        px-3
                        py-1.5
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding
                        border border-solid border-gray-300
                        rounded
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                        ' type="date" placeholder="ExpirationDate" {...register("expirationdate", {})} />
                            {errors.expirationdate && <span className="text-red-500">{errors.expirationdate.message}</span>}
                        </div>
                        <div className='col-span-2 mb-1'>
                            <label className="form-label inline-block mb-2 text-gray-700">Amount</label>
                        </div>
                        <div className="mb-4">
                            <input className='
                        form-input 
                        form-control
                        block
                        w-full
                        px-3
                        py-1.5
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding
                        border border-solid border-gray-300
                        rounded
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                        ' type="number" placeholder="Amount" {...register("amount", {})} />
                            {errors.amount && <span className="text-red-500">{errors.amount.message}</span>}
                        </div>
                        <div className='col-span-2 mb-1'>
                            <label className="form-label inline-block mb-2 text-gray-700">Status</label>
                        </div>
                        <div className="mb-4">
                            <select className='
                        form-select
                        form-control
                        block
                        w-full
                        px-3
                        py-1.5
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding
                        border border-solid border-gray-300
                        rounded
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                        ' {...register("status")}>
                                <option value="">Seleccione una opción</option>
                                <option value="Pago">Pago</option>
                                <option value="Cancelado">Cancelado</option>
                                <option value="Sin Pagar">Sin Pagar</option>
                            </select>
                            {errors.status && <span className="text-red-500">{errors.status.message}</span>}
                        </div>
                        <div className='col-span-2 mb-1'>
                            <label className="form-label inline-block mb-2 text-gray-700">Barcode</label>
                        </div>
                        <div className="mb-4">
                            <input className='
                        form-input 
                        form-control
                        block
                        w-full
                        px-3
                        py-1.5
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding
                        border border-solid border-gray-300
                        rounded
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                        ' type="text" placeholder="barcode" {...register("barcode", {})} />
                            {errors.barcode && <span className="text-red-500">{errors.barcode.message}</span>}
                        </div>
                        <button className='
                        w-full
                        px-6
                        py-2.5
                        bg-blue-600
                        text-white
                        font-medium
                        text-xs
                        leading-tight
                        uppercase
                        rounded
                        shadow-md
                        hover:bg-blue-700 hover:shadow-lg
                        focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
                        active:bg-blue-800 active:shadow-lg
                        transition
                        duration-150
                        ease-in-out
                    ' type="submit">Guardar</button>
                    </form>
                </div>
            </div>
        </>

    )


}