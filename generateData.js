const { faker } = require('@faker-js/faker');
const { DateTime: DT } = require('luxon');

const {
  string: { fromCharacters, numeric },
  person,
  internet,
  helpers,
  date,
} = faker;

const typeToName = {
  motorcycle: 'Motorcycle',
  taxi: 'Taxi',
  car: 'Private car / Light Good Vehicle',
};
const typeToId = {
  motorcycle: '4',
  taxi: '5',
  car: '3',
};

const vrm = () => {
  const alpha = fromCharacters('ABCDEFGHJKLMNPRSTUVWXYZ', 2);
  return `${alpha}${numeric(4)}`;
};

const fillData = (array) => array.map((type, index) => {
  const projectName = `00P90096${typeToId[type] || '3'}`;

  const applicationNumber = `${projectName}${String(index + 1)
    .padStart(3, '0')
    .slice(-3)}`;
  const contactNumber = `999${fromCharacters('0123456789', 5)}`;
  const ApplicantName = person.fullName();
  const emailAddress = internet.email({ provider: 'techlutionservice.com' });
  const physicalDisability = 'N';
  const vehicleRegistrationMark = vrm();
  const vehicleType = typeToName[type];
  const licenceExpires = DT.fromJSDate(date.future({ years: 2 })).toFormat('yyyy-MM-dd');
  const remarks = '';
  const agreeRequirement = 'Y';
  const submissionDateTime = DT.fromJSDate(date.recent({ days: 10 })).toFormat('yyyy-MM-dd HH:mm:ss');
  const staffRemark = '';
  const empty = '220314000000';

  return {
    applicationNumber,
    contactNumber,
    ApplicantName,
    emailAddress,
    physicalDisability,
    vehicleRegistrationMark,
    vehicleType,
    licenceExpires,
    remarks,
    agreeRequirement,
    submissionDateTime,
    staffRemark,
    empty,
    index: index + 1,
  };
});

const generateSimpleData = (config) => {
  const { total } = config;
  console.log(`Generating ${total} records`);

  const data = Array.from({ length: total })
    .fill(0)
    .map(() => helpers.arrayElement(['motorcycle', 'taxi', 'car']));
  const filledData = fillData(data);
  return filledData;
};

const generateAdvancedData = (config) => {
  const { type, total } = config;
  console.log(`Generating ${total} records for ${type}`);

  const data = Array.from({ length: total })
    .fill(0)
    .map(() => type);
  const filledData = fillData(data);
  return filledData;
};

module.exports = { generateSimpleData, generateAdvancedData };
