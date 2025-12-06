import React, { useState } from 'react';

// Data dummy IP yang SUDAH TERPAKAI (Unavailable).
// IP 33-36 memiliki VID 333.
// IP 96-97 memiliki VID 960.
const data = [
    { id: 1, ipSegment: "160.25.236.", ipHost: "33", ipPrefix: "/30", vid: "333" },
    { id: 2, ipSegment: "160.25.236.", ipHost: "34", ipPrefix: "/30", vid: "333" },
    { id: 3, ipSegment: "160.25.236.", ipHost: "35", ipPrefix: "/30", vid: "333" },
    { id: 4, ipSegment: "160.25.236.", ipHost: "36", ipPrefix: "/30", vid: "333" },
    { id: 5, ipSegment: "160.25.236.", ipHost: "96", ipPrefix: "/31", vid: "960" },
    { id: 6, ipSegment: "160.25.236.", ipHost: "97", ipPrefix: "/31", vid: "960" },
];

// Map untuk mengelompokkan data berdasarkan VID
const groupedData = data.reduce((acc, current) => {
    const host = parseInt(current.ipHost);
    if (!acc[host]) {
        acc[host] = current;
    }
    return acc;
}, {} as { [key: number]: typeof data[0] });


const Vlanipcontent = () => {
    const IpSegment = "160.25.236.";
    const ipTotal = 255;
    let elements = [];

    // 1. Buat Map dari IP yang Digunakan (Unavailable)
    const usedIpMap = new Map<number, typeof data[0]>();
    data.forEach(e => usedIpMap.set(parseInt(e.ipHost), e));

    let i = 0;
    while (i <= ipTotal) {
        const currentIpData = usedIpMap.get(i);

        if (currentIpData) {
            // --- A. TAMPILKAN IP YANG DIGUNAKAN (GABUNG BERDASARKAN VLANID) ---
            const currentVid = currentIpData.vid;
            const blockStart = i;
            let blockEnd = i;
            
            // Lanjutkan agregasi selama IP berurutan terpakai DAN memiliki VLANID yang SAMA
            let j = i + 1;
            while (j <= ipTotal) {
                const nextIpData = usedIpMap.get(j);
                // Jika IP berikutnya terpakai DAN memiliki VID yang sama
                if (nextIpData && nextIpData.vid === currentVid) {
                    blockEnd = j;
                    j++;
                } else {
                    break;
                }
            }

            const rangeDisplay = (blockStart === blockEnd)
                ? IpSegment + blockStart // Tampilkan IP tunggal jika range = 1
                : IpSegment + blockStart + " - " + IpSegment + blockEnd; // Tampilkan range

            // Tampilkan Prefix hanya jika range-nya tunggal (/30, /31) atau jika Anda memiliki logika CIDR untuk group VID
            // Karena data dummy memberikan Prefix per IP, kita ambil prefix dari IP pertama.
            const prefixDisplay = currentIpData.ipPrefix; 

            elements.push(
                <div className="grid grid-cols-4 p-2 bg-gray-200 text-black" key={`used-range-${blockStart}`}>
                    <div className='justify-self-start pl-4'>{rangeDisplay}</div>
                    <div className='justify-self-center'>{prefixDisplay}</div> 
                    <div className='justify-self-center'>{currentVid}</div> 
                    <div className='justify-self-center'>Unavailable</div>
                </div>
            );
            
            i = blockEnd + 1; // Lompati ke IP setelah blok VID yang baru saja diagregasi

        } else {
            // --- B. AGREGASI FREE SPACE (SELURUH BLOK KONTIGU) ---
            let blockStart = i;
            let currentFreeBlockSize = 0;

            // Hitung berapa banyak IP berurutan yang 'Free'
            for (let j = i; j <= ipTotal && !usedIpMap.has(j); j++) {
                currentFreeBlockSize++;
            }
            
            let rangeEnd = blockStart + currentFreeBlockSize - 1;
            const rangeDisplay = IpSegment + blockStart + " - " + IpSegment + rangeEnd;

            // Tambahkan elemen Free Space sebagai satu baris agregasi
            elements.push(
                <div className="grid grid-cols-4 p-2 bg-gray-500 text-white" key={`free-${blockStart}`}>
                    <div className='justify-self-start pl-4'>{rangeDisplay}</div>
                    {/* Kolom Prefix: KOSONG */}
                    <div className='justify-self-center'></div> 
                    {/* Kolom VLANID: KOSONG */}
                    <div className='justify-self-center'></div> 
                    <div className='justify-self-center'>Available</div>
                </div>
            );
            
            i = rangeEnd + 1; // Lompati seluruh blok yang baru saja diagregasi
        }
    }

    // 4. Struktur Rendering (JSX)
    return (
        <div className="border">
            {/* HEADER TABLE */}
            <div className="grid grid-cols-4 font-bold border-b p-2 bg-gray-700 text-white">
                <div className='justify-self-start pl-4'>IP ADDRESS</div>
                <div className='justify-self-center'>PREFIX</div>
                <div className='justify-self-center'>VLANID</div>
                <div className='justify-self-center'>STATUS</div>
            </div>
            
            {/* BODY TABLE */}
            {elements.map((e) => e)}
        </div>
    );
};

export default Vlanipcontent;