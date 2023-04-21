function eDat() {
    let rList = [];
    let unpack = [];
    ePool.forEach((sort) => {
        unpack = sort
        JSON.parse(sort.datea).forEach((date) => {
            let repack = [];
            convert = Object.values(date);
            convert.forEach((dateData) => {
                if (new Date(dateData) >= Date.now()) {
                    repack.push(new Date(dateData));
                }
            });
            unpack.datea = repack
        });
        if (new Date(unpack.datea[0]).getFullYear() === new Date().getFullYear()) {
          rList.push(unpack);  
          }
        })
    eventPoolRaw = rList.sort((a, b) => {return a.datea[0] - b.datea[0]});
}

eDat()