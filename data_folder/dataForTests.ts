import { faker } from '@faker-js/faker';

export const data = {
    firstName: 'TestName',
    lastName: 'TestLast',
    email: 'testmail589@gmail.com',
    password: 'testPass_1234',
    orderId: '000014423',
    fakeOrderId: faker.random.numeric(9)
};

export const userData = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: `playwrightCourse-${faker.random.alphaNumeric(7)}@malinator.com`,
    userEmail: `playwrightCourseNew-${faker.random.alphaNumeric(7)}@malinator.com`,
    password: `${faker.internet.password(7)}-pL23`,
    newPassword: `${faker.internet.password(7)}-pL23`
};
