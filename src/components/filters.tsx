import React from "react";
import { Fragment, useState, useEffect } from 'react'
import { trpc } from "../utils/trpc";

import {
    BriefcaseIcon,
    CalendarIcon,
    CheckIcon,
    ChevronDownIcon,
    CurrencyDollarIcon,
    LinkIcon,
    LocationMarkerIcon,
    PencilIcon,
    PlusIcon,
    SelectorIcon,
    ArrowLeftIcon
} from '@heroicons/react/solid'
import { Menu, Transition, Listbox } from '@headlessui/react'
import PayablesList from "./payableslist";

const filters = [
    { filtertype: 'All' },
    { filtertype: 'Luz' },
    { filtertype: 'Internet' },
    { filtertype: 'TV' }
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

type FilterProps = {
    
    typeBtn: string;
}

export default function Filters({ typeBtn }: FilterProps) {
    const [selected, setSelected] = useState(filters[0]);

    
        return (
            <>
                <div className="flex flex-row justify-around px-8 py-8 mx-8">
                    <div className="flex">
                        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:tracking-tight sm:truncate">
                            Payables
                        </h2>
                    </div>

                    <div className="flex ">
                        <span className="hidden sm:block w-32">
                            {typeBtn === 'createPayable' &&
                                <Listbox value={selected} onChange={setSelected}>
                                    <div className="relative mt-1">
                                        <Listbox.Button className="
                                relative 
                                w-full 
                                cursor-default 
                                rounded-lg 
                                bg-white 
                                py-2 
                                pl-3 pr-10 
                                text-left shadow-md 
                                focus:outline-none focus-visible:border-indigo-500 
                                focus-visible:ring-2 focus-visible:ring-white 
                                focus-visible:ring-opacity-75 
                                focus-visible:ring-offset-2 
                                focus-visible:ring-offset-orange-300 
                                sm:text-sm">
                                            <span className="block truncate">{selected?.filtertype}</span>
                                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                <SelectorIcon
                                                    className="h-5 w-5 text-gray-400"
                                                    aria-hidden="true"
                                                />
                                            </span>
                                        </Listbox.Button>
                                        <Transition
                                            as={Fragment}
                                            leave="transition ease-in duration-100"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                {filters.map((filter, filterIdx) => (
                                                    <Listbox.Option
                                                        key={filterIdx}
                                                        className={({ active }) =>
                                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                                            }`
                                                        }
                                                        value={filter}
                                                    >
                                                        {({ selected }) => (
                                                            <>
                                                                <span
                                                                    className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                                        }`}
                                                                >
                                                                    {filter.filtertype}
                                                                </span>
                                                                {selected ? (
                                                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                    </span>
                                                                ) : null}
                                                            </>
                                                        )}
                                                    </Listbox.Option>
                                                ))}
                                            </Listbox.Options>
                                        </Transition>
                                    </div>
                                </Listbox>
                            }
                        </span>

                        <span className="sm:ml-3">
                            {typeBtn === 'createPayable' &&
                                <a
                                    type="button"
                                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    href="/payables/create"
                                >
                                    <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                                    Create Payable
                                </a>
                            }
                            {typeBtn === 'Payable' &&
                                <a
                                    type="button"
                                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    href="/payables"
                                >
                                    <ArrowLeftIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                                    Volver
                                </a>
                            }
                        </span>


                    </div>

                </div>
                
                {typeBtn === 'createPayable' &&
                    <div>
                        {selected?.filtertype === 'All' &&
                            <div>
                                <PayablesList filter="All" />
                            </div>
                        }
                        {selected?.filtertype !== 'All' &&
                            <div>
                                <PayablesList filter={selected ? selected.filtertype.toString() : ''} />
                            </div>
                        }
                        
                    </div>
                }


            </>
        )
    
    
}