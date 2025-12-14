import React, { useState, useContext, use } from 'react';
import Context from '../../pages/Context';

const data = [
    { id: 1, ipSegment: "160.25.236.", ipHost: "33", ipPrefix: "/30", vid: "333", vlanName: "LL.WV-NFI.FREEDOM.NET" },
    { id: 2, ipSegment: "160.25.236.", ipHost: "34", ipPrefix: "/30", vid: "333", vlanName: "LL.WV-NFI.FREEDOM.NET" },
    { id: 3, ipSegment: "160.25.236.", ipHost: "35", ipPrefix: "/30", vid: "333", vlanName: "LL.WV-NFI.FREEDOM.NET" },
    { id: 4, ipSegment: "160.25.236.", ipHost: "36", ipPrefix: "/30", vid: "333", vlanName: "LL.WV-NFI.FREEDOM.NET" },
    { id: 5, ipSegment: "160.25.236.", ipHost: "96", ipPrefix: "/31", vid: "960", vlanName: "LL.FS-NFI.FREEDOM.NET" },
    { id: 6, ipSegment: "160.25.236.", ipHost: "97", ipPrefix: "/31", vid: "960", vlanName: "LL.FS-NFI.FREEDOM.NET" },
    { id: 7, ipSegment: "160.25.236.", ipHost: "101", ipPrefix: "/30", vid: "200", vlanName: "LL.WV-NFI.NADA.NET" },
    { id: 8, ipSegment: "160.25.236.", ipHost: "102", ipPrefix: "/30", vid: "200", vlanName: "LL.WV-NFI.NADA.NET" },
    { id: 9, ipSegment: "160.25.236.", ipHost: "103", ipPrefix: "/30", vid: "200", vlanName: "LL.WV-NFI.NADA.NET" },
    { id: 10, ipSegment: "160.25.236.", ipHost: "104 ", ipPrefix: "/30", vid: "200", vlanName: "LL.WV-NFI.NADA.NET" },
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
    const [,,,,ipSegmentActive] = useContext(Context);
    console.log("Current IP Segment Active:", ipSegmentActive);

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
            const currentVlanName = currentIpData.vlanName;
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
                    <div className='justify-self-center'>{currentVlanName}</div>
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
                <div className="grid grid-cols-3 p-2 bg-gray-500 text-white" key={`free-${blockStart}`}>
                    <div className='justify-self-start pl-4'>{rangeDisplay}</div>
                    <button className='justify-self-center cursor-pointer transition-all duration-300 ease-in-out hover:bg-green-500 px-2 rounded-md'>[+] Add new note</button>
                </div>
            );
            
            i = rangeEnd + 1; // Lompati seluruh blok yang baru saja diagregasi
        }
    }

    // 4. Struktur Rendering (JSX)
    return (
        <>
            <div className="mb-4 ">
                <h1 className="text-2xl font-bold">VLANs & IPs Management</h1>
                {/* <p className="text-gray-600">IP TYPE</p> */}
                <div className='flex gap-2 pt-4 pb-2'>
                    <div className={`rounded-2xl shadow-lg hover:bg-[var(--bg-muted)] ${ipSegmentActive == '160.25.236.' ? 'bg-[var(--secondary-foreground)] text-[var(--secondary)]':'bg-transparent text-[var(--secondary-foreground)]'} border-2 justify-center items-center w-20 h-8 flex cursor-pointer`}>
                        <input id='236' className='hidden' type="radio" value='160.25.236.'/> 
                        <label className='cursor-pointer' htmlFor="236">236</label>
                    </div>
                    <div className={`rounded-2xl shadow-lg hover:bg-[var(--bg-muted-foreground)] ${ipSegmentActive == '160.25.237.' ? 'bg-[var(--secondary-foreground)] text-[var(--secondary)]':'bg-transparent text-[var(--secondary-foreground)]'} border-2 p-2 justify-center items-center w-20 h-8 flex cursor-pointer`}>
                        <input id='237' className='hidden' type="radio" value='160.25.237.'/>
                        <label className='cursor-pointer' htmlFor="237">237</label>
                    </div>
                    <div className={`rounded-2xl shadow-lg hover:bg-[var(--bg-muted-foreground)] ${ipSegmentActive == 'mgmt' ? 'bg-[var(--secondary-foreground)] text-[var(--secondary)]':'bg-transparent text-[var(--secondary-foreground)]'} border-2 p-2 justify-center items-center w-20 h-8 flex cursor-pointer`}>
                        <input id='mgmt' className='hidden' type="radio" value='mgmt'/>
                        <label className='cursor-pointer' htmlFor="mgmt">MGMT</label>
                    </div>

                </div>
            </div>
            <div className="border rounded-2xl shadow-lg overflow-hidden">

                {/* HEADER TABLE */}
                <div className="grid grid-cols-4 font-bold border-b p-2 bg-gray-700 text-white">
                    <div className='justify-self-start pl-4'>IP ADDRESS</div>
                    <div className='justify-self-center'>PREFIX</div>
                    <div className='justify-self-center'>VLANID</div>
                    <div className='justify-self-center'>NAME</div>
                </div>
                
                {/* BODY TABLE */}
                {elements.map((e) => e)}
            </div>
        </>
    );
};

export default Vlanipcontent;