import {use, useState} from 'react'

const vlanipcontent = () => {

    let data = [
        {
            "id": 1,
            "ipSegment": "160.25.236.",
            "ipHost": '33',
            "ipPrefix": "/30",
            "vid": "333",
        },
        {
            "id": 2,
            "ipSegment": "160.25.236.",
            "ipHost": '34',
            "ipPrefix": "/30",
            "vid": "333",
        },
        {
            "id": 3,
            "ipSegment": "160.25.236.",
            "ipHost": '35',
            "ipPrefix": "/30",
            "vid": "333",
        },
        {
            "id": 4,
            "ipSegment": "160.25.236.",
            "ipHost": '36',
            "ipPrefix": "/30",
            "vid": "333",
        },
        {
            "id": 5,
            "ipSegment": "160.25.236.",
            "ipHost": '96',
            "ipPrefix": "/31",
            "vid": "960",
        },
        {
            "id": 6,
            "ipSegment": "160.25.236.",
            "ipHost": '97',
            "ipPrefix": "/31",
            "vid": "960",
        },
    ]

    // const [avail, setAvail] = useState(false);
    // const [startIp, setStartIp] = useState(0);
    // const [endIp, setEndIp] = useState(0);

    let ipSegment = ["160.25.236.", "160.25.237."];
    let ipTotal = 255

    const elements = [];
    let ipStart = [];
    let ipEnd = [];
    outerloop:
    for (let i = 0; i <= ipTotal; i++) {
        for(const e of data) {
            if(i == parseInt(e.ipHost)) {
                elements.push(
                    <div className='grid grid-cols-4 p-2'>
                        <div>{e.ipSegment+e.ipHost}</div>
                        <div className='justify-self-center'>{e.ipPrefix}</div>
                        <div className='justify-self-center'>{e.vid}</div>
                        <div className='justify-self-center'>Unavailable</div>
                    </div>
                );
                continue outerloop;
            }
        }
        elements.push(
            <div className='grid grid-cols-2 p-2'>
                <p className='p2'>{ipSegment[0]+i}</p>
                <div className=''>Available</div>
            </div>
        );
    }

    console.log(data[0].vid)

  return (
    <>  
        <div className='border'>

            <div className='grid grid-cols-4 font-bold border p-2'>
                <div>IP ADDRESS</div>
                <div className='justify-self-center'>PREFIX</div>
                <div className='justify-self-center'>VLANID</div>
                <div className='justify-self-center'>STATUS</div>
            </div>
            {
                elements.map(e=> {
                    return (e)
                })
                
            }
        </div>
    </>
  )
}

export default vlanipcontent