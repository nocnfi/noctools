import React, { useState, useContext, use, useEffect } from 'react';
import Context from '../../pages/Context';

const allData = [
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
    { id: 11, ipSegment: "160.25.237.", ipHost: "150", ipPrefix: "/29", vid: "550", vlanName: "LL.AB-NFI.FREEDOM.NET" },
    { id: 12, ipSegment: "160.25.237.", ipHost: "151", ipPrefix: "/29", vid: "550", vlanName: "LL.AB-NFI.FREEDOM.NET" },
    { id: 13, ipSegment: "160.25.237.", ipHost: "152", ipPrefix: "/29", vid: "550", vlanName: "LL.AB-NFI.FREEDOM.NET" },
    { id: 14, ipSegment: "160.25.237.", ipHost: "153", ipPrefix: "/29", vid: "550", vlanName: "LL.AB-NFI.FREEDOM.NET" },
    { id: 15, ipSegment: "160.25.237.", ipHost: "154", ipPrefix: "/29", vid: "550", vlanName: "LL.AB-NFI.FREEDOM.NET" },
    { id: 16, ipSegment: "160.25.237.", ipHost: "155", ipPrefix: "/29", vid: "550", vlanName: "LL.AB-NFI.FREEDOM.NET" },
    { id: 17, ipSegment: "160.25.237.", ipHost: "200", ipPrefix: "/28", vid: "800", vlanName: "LL.CD-NFI.FREEDOM.NET" },
    { id: 18, ipSegment: "160.25.237.", ipHost: "201", ipPrefix: "/28", vid: "800", vlanName: "LL.CD-NFI.FREEDOM.NET" },
    { id: 19, ipSegment: "160.25.237.", ipHost: "202", ipPrefix: "/28", vid: "800", vlanName: "LL.CD-NFI.FREEDOM.NET" },
    { id: 20, ipSegment: "160.25.237.", ipHost: "203", ipPrefix: "/28", vid: "800", vlanName: "LL.CD-NFI.FREEDOM.NET" },
    { id: 21, ipSegment: "160.25.237.", ipHost: "204", ipPrefix: "/28", vid: "800", vlanName: "LL.CD-NFI.FREEDOM.NET" },
    { id: 22, ipSegment: "160.25.237.", ipHost: "205", ipPrefix: "/28", vid: "800", vlanName: "LL.CD-NFI.FREEDOM.NET" },
    { id: 23, ipSegment: "160.25.237.", ipHost: "206", ipPrefix: "/28", vid: "800", vlanName: "LL.CD-NFI.FREEDOM.NET" },
    { id: 24, ipSegment: "160.25.237.", ipHost: "207", ipPrefix: "/28", vid: "800", vlanName: "LL.CD-NFI.FREEDOM.NET" },
];


const Vlanipcontent = () => {
    const [,,,,ipSegmentActive, setIpSegmentActive] = useContext(Context);
    console.log("Current IP Segment Active:", ipSegmentActive);
    
    const filteredData = allData.filter(item => item.ipSegment === ipSegmentActive);

    const [showPopup, setShowPopup] = useState(false);
    const [selectedIpData, setSelectedIpData] = useState<typeof allData[0] | null>(null);
    const [formData, setFormData] = useState({ ipSegment: '', ipHost: '', ipPrefix: '', vid: '', vlanName: '' });

    const IpSegment = ipSegmentActive; // Use the active IP segment
    const ipTotal = 255;
    let elements = [];
    
    // 1. Buat Map dari IP yang Digunakan (Unavailable)
    const usedIpMap = new Map<number, typeof allData[0]>();
    filteredData.forEach(e => usedIpMap.set(parseInt(e.ipHost), e));

    useEffect(() => {
        if (selectedIpData) {
            setFormData({
                ipSegment: selectedIpData.ipSegment,
                ipHost: selectedIpData.ipHost,
                ipPrefix: selectedIpData.ipPrefix,
                vid: selectedIpData.vid,
                vlanName: selectedIpData.vlanName,
            });
        }
    }, [selectedIpData]);


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
                <div
                    className="grid grid-cols-4 p-2 bg-transparent text-[var(--secondary-foreground)] hover:bg-[var(--ring)] cursor-pointer transition-all duration-300 ease-in-out"
                    key={`used-range-${blockStart}`}
                    onClick={() => {
                        setSelectedIpData(currentIpData);
                        setShowPopup(true);
                    }}>
                    <div className='justify-self-start pl-4'>{rangeDisplay}</div>
                    <div className='justify-self-center'>{prefixDisplay}</div> 
                    <div className='justify-self-center'>{currentVid}</div> 
                    <div className='justify-self-center'>{currentVlanName}</div>
                </div>
            );
            
            i = blockEnd + 1; // Lompati ke IP setelah blok VID yang baru saja diagregasi

        } else {
            // --- B. AGREGASI FREE SPACE (SELURUH BLOK KO NTIGU) ---
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
                <div className="grid grid-cols-3 p-2 bg-[var(--transparent-green)] text-[var(--secondary-foreground)]" key={`free-${blockStart}`}>
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
                <div className='flex gap-2 pt-4 pb-2 transition-all duration-300 ease-in-out'>
                    <div className={`rounded-2xl shadow-lg ${ipSegmentActive == '160.25.236.' ? 'bg-[var(--secondary-foreground)] text-[var(--secondary)]':'bg-transparent text-[var(--secondary-foreground)] hover:bg-[var(--ring)]'} border-2 justify-center items-center w-20 h-8 flex cursor-pointer transition-all duration-300 ease-in-out`} onClick={() => setIpSegmentActive('160.25.236.')}>
                        <input id='236' className='hidden' type="radio" name="ipSegment" value='160.25.236.' checked={ipSegmentActive === '160.25.236.'} onChange={() => {}}/> 
                        <label className='cursor-pointer' htmlFor="236">236</label>
                    </div>
                    <div className={`rounded-2xl shadow-lg ${ipSegmentActive == '160.25.237.' ? 'bg-[var(--secondary-foreground)] text-[var(--secondary)]':'bg-transparent text-[var(--secondary-foreground)] hover:bg-[var(--ring)]'} border-2 p-2 justify-center items-center w-20 h-8 flex cursor-pointer transition-all duration-300 ease-in-out`} onClick={() => setIpSegmentActive('160.25.237.')}>
                        <input id='237' className='hidden' type="radio" name="ipSegment" value='160.25.237.' checked={ipSegmentActive === '160.25.237.'} onChange={() => {}}/>
                        <label className='cursor-pointer' htmlFor="237">237</label>
                    </div>
                    <div className={`rounded-2xl shadow-lg ${ipSegmentActive == 'mgmt' ? 'bg-[var(--secondary-foreground)] text-[var(--secondary)]':'bg-transparent text-[var(--secondary-foreground)] hover:bg-[var(--ring)]'} border-2 p-2 justify-center items-center w-20 h-8 flex cursor-pointer transition-all duration-300 ease-in-out`} onClick={() => setIpSegmentActive('mgmt')}>
                        <input id='mgmt' className='hidden' type="radio" name="ipSegment" value='mgmt' checked={ipSegmentActive === 'mgmt'} onChange={() => {}}/>
                        <label className='cursor-pointer' htmlFor="mgmt">MGMT</label>
                    </div>

                </div>
            </div>
            <div className="border rounded-2xl shadow-lg overflow-hidden">

                {/* HEADER TABLE */}
                <div className="grid grid-cols-4 font-bold border-b p-2 bg-[var(--secondary-foreground)] text-[var(--secondary)]">
                    <div className='justify-self-start pl-4'>IP ADDRESS</div>
                    <div className='justify-self-center'>PREFIX</div>
                    <div className='justify-self-center'>VLANID</div>
                    <div className='justify-self-center'>NAME</div>
                </div>
                
                {/* BODY TABLE */}
                {elements.map((e) => e)}
            </div>

            {showPopup && selectedIpData && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4 text-gray-800">Update IP Information</h2>
                        <form>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ipSegment">
                                    IP Segment
                                </label>
                                <input
                                    type="text"
                                    id="ipSegment"
                                    name="ipSegment"
                                    value={formData.ipSegment}
                                    onChange={(e) => setFormData({ ...formData, ipSegment: e.target.value })}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ipHost">
                                    IP Host
                                </label>
                                <input
                                    type="text"
                                    id="ipHost"
                                    name="ipHost"
                                    value={formData.ipHost}
                                    onChange={(e) => setFormData({ ...formData, ipHost: e.target.value })}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ipPrefix">
                                    IP Prefix
                                </label>
                                <input
                                    type="text"
                                    id="ipPrefix"
                                    name="ipPrefix"
                                    value={formData.ipPrefix}
                                    onChange={(e) => setFormData({ ...formData, ipPrefix: e.target.value })}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="vid">
                                    VLAN ID
                                </label>
                                <input
                                    type="text"
                                    id="vid"
                                    name="vid"
                                    value={formData.vid}
                                    onChange={(e) => setFormData({ ...formData, vid: e.target.value })}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="flex justify-end">
                                <button type="button" onClick={() => setShowPopup(false)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2">Cancel</button>
                                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default Vlanipcontent;