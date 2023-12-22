
const visialusationByYear = (departmentId)=> `
query {
  departmentByIdForYear(departmentId: ${departmentId}) {
    prestation_id
    description
    sum
    count
    date
    avg
  }
}`;
const visialusationByMonth = (departmentId)=> `
query {
  departmentByIdForMonth(departmentId: ${departmentId}) {
    prestation_id
    description
    sum
    count
    month
    avg
  }
}`;
const departmentById = (departmentId)=> `
query {
  departmentById(departmentId: ${departmentId}) {
    id
    description
    sum
    count
    avg
  }
}`;
const departmentsGlobal = () => `
query {
  departments {
    nom
    department
    sum
    count
    avg
  }
}`;
const prestationsGlobal = () => `
query {
  prestations {
    id
    description
    sum
    count
    avg
  }
} `;
const regionsGlobal = () => `
query {
  regions {
    nom 
    sum
  }
} `;
