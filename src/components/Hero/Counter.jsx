import React from 'react';

const Counter = () => {
    return (
        <div>
            <div class="card flex justify-center gap-20 bg-[#002570] mt-20 mx-60 rounded-xl shadow-lg">
                <div class="card-1 h-40 w-60 flex flex-col justify-center items-center">
                    <h1 class="text-6xl font-bold text-[#e1eeff]">20+</h1>
                    <p class="text-3xl text-white">Campaign</p>
                </div>
                <div class="card-1 h-40 w-60 flex flex-col justify-center items-center">
                    <h1 class="text-6xl font-bold text-[#e1eeff]">04+</h1>
                    <p class="text-3xl text-white mr-5">Doses</p>
                </div>
                <div class="card-1 h-40 w-60 flex flex-col justify-center items-center">
                    <h1 class="text-6xl font-bold text-[#e1eeff]">07+</h1>
                    <p class="text-3xl text-white">Vaccination</p>
                </div>
            </div>
        </div>
    );
};

export default Counter;