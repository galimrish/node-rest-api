const mongoose = require('mongoose');

const CommonApiMethods = {
  
  get: async (model, request) => {
    const { page = '0', size, sort, name, code, city, shopCategory, merchandise } = request;
    const dbQueries = [];
    
    if (name) {
      dbQueries.push({
        $match: {
            name: { $regex: `.*${name}.*` },
        }
      });
    }
    if (code) {
      dbQueries.push({
        $match: {
            code: Number(code),
        }
      });
    }
    if (city) {
      dbQueries.push({
        $match: {
            city: { $regex: `.*${city}.*` },
        }
      });
    }
    if (shopCategory) {
      dbQueries.push({
        $match: {
            shopCategory: { $regex: `.*${shopCategory}.*` },
        }
      });
    }
    if (merchandise) {
      dbQueries.push({
        $match: {
            merchandise: { $regex: `.*${merchandise}.*` },
        }
      });
    }

    const facet = {
      count: [
        { $count: 'total' }
      ],
      data: []
    };

    const sortArr = sort ? sort.split(',') : [];
    const sortObj = {}; 
    if (sortArr.length === 2) {
      sortObj[sortArr[0]] = sortArr[1] === 'desc' ? 1 : -1;
      facet.data.push({ $sort: sortObj });
    }
    
    if (page && size) {
      const pageNumber = +page;
      const sizeNumber = +size;
      facet.data.push({ $skip: pageNumber * sizeNumber });
      facet.data.push({ $limit: sizeNumber });
    }

    dbQueries.push({$facet: facet});

    const dbRes = await model.aggregate(dbQueries);
    const {count, data} = dbRes[0];
    
    return {
      count: count.length ? count[0].total : 0,
      data: data,
    }
  },

  post: async (model, request) => {
    const {name} = request;
    const dublicate = await model.find({name});
    if (dublicate.length) {
      throw new Error(`'${name}' already exists`);
    }
    
    const data = new model({ ...request, creationDate: new Date() });
    await data.save();
  },

  put: async (model, modelHistory, request) => {
    const id = request.id;
    const {name} = request.body;
    const entity = await model.findById(id);
    const dublicate = await model.find({name});
    if (dublicate.some(x => x.id !== entity.id)) {
      throw new Error(`'${name}' already exists`);
    }
    
    await model.findByIdAndUpdate(id, request.body);
    await saveHistory(modelHistory, id, entity, request.body);
  },

  delete: async (model, modelHistory, id) => {
    const entity = await model.findByIdAndDelete(id);
    const deletedModel = {
      ...entity._doc,
      id,
      deleted: true
    };
    await saveHistory(modelHistory, id, deletedModel, deletedModel);
  },

  getHistory: async (model, request) => {
    const { page = '0', size, sort, id, beginChangeDate, endChangeDate } = request;
    const dbQueries = [];
    
    const matchQuery = [];
    if (id) {
      matchQuery.push({id: mongoose.Types.ObjectId(id)});
    }
    if (beginChangeDate || endChangeDate) {
      const changeDate = {};
      if (beginChangeDate) changeDate['$gte'] = new Date(beginChangeDate);
      if (endChangeDate) changeDate['$lt'] = new Date(endChangeDate);
      matchQuery.push({changeDate});
    }
    if (matchQuery.length === 1) {
      dbQueries.push({$match: matchQuery[0]})
    }
    if (matchQuery.length === 2) {
      dbQueries.push({$match: {$and: matchQuery}});
    }

    const facet = {
      count: [
        { $count: 'total' }
      ],
      data: []
    };

    const sortArr = sort ? sort.split(',') : [];
    const sortObj = {}; 
    if (sortArr.length === 2) {
      sortObj[sortArr[0]] = sortArr[1] === 'desc' ? 1 : -1;
      facet.data.push({ $sort: sortObj });
    }
    
    if (page && size) {
      const pageNumber = +page;
      const sizeNumber = +size;
      facet.data.push({ $skip: pageNumber * sizeNumber });
      facet.data.push({ $limit: sizeNumber });
    }

    dbQueries.push({$facet: facet});

    const dbRes = await model.aggregate(dbQueries);
    const {count, data} = dbRes[0];

    return {
      count: count.length ? count[0].total : 0,
      data
    }
  },
}

const saveHistory = async (model, id, currentData, updatedData) => {
  const changes = {};
  Object.keys(updatedData).forEach(key => {
    changes[key] = currentData[key];
  });
  
  const history = new model({
    id: mongoose.Types.ObjectId(id),
    changes: JSON.stringify(changes),
    changeDate: new Date(),
  });

  await history.save();
}

module.exports = CommonApiMethods;
