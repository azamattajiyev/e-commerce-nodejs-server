const paginateData = (data,limit=25,page=1) => {
    const { count: totalCount, rows: tabledata } = data;
    const total = Math.ceil(totalCount / limit);
    return  successRes({
        page,
        limit,
        total,
        totalCount,
        tabledata,
    })
}
const errorRes = (message) => {
    return {
        success: false,
        message: message
    }
}

const successRes = (data,message='ok') => {
    return {
        success: true,
        message: message,
        data:data
    }
}

const selecteditem=(array,ids=[])=>{
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < ids.length; j++) {
            const id = ids[j];
            if (id==array[i].id) {
                array[i].selected=true
            }
        }
    }
    return array
}

const attributes={
    productPattern:['id','name','description',],
    productPattern2:['id','name','description','active'],
    product:['id','order', 'price', 'active','priceLast','discount','amount','barcode'],
}
const excludes={
    time:[ 'createdAt','updatedAt'],
    user:['password', 'userId', 'createdAt','updatedAt']
}

module.exports = {
	successRes,
	errorRes,
	paginateData,
    selecteditem,
    attributes,
    excludes,
};