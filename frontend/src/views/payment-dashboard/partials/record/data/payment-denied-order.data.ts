export const paymentDeniedOrder = {
  id: 'bc5063d5-ea2d-4c94-b9f1-1479d183118c',
  invoiceNumber: 'R1234439',
  deliveryDate: '2022-10-18T06:36:07.000Z',
  draft: false,
  receivableAmount: 541.13,
  paymentTerm: '12',
  receivableReferenceId: 'a3dab014-28ab-4474-8506-a2bbed71a036',
  createdAt: '2022-10-18T01:36:05.870Z',
  receivable: {
    status: 'EXPIRED',
    __typename: 'ReceivableInfoModel',
  },
  orderFiles: [
    {
      id: '6034bb44-19ed-4e2f-b8c3-a53c21060667',
      name: 'Important Document (1)-1666074994078.pdf',
      url:
        'https://storage.googleapis.com/fbdaa685-d335-46f2-93a4-33ac4b4ef4ff-tenant-bucket/Important%20Document%20%281%29-1666074994078.pdf?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=sa-b2a38e48220deeffdff2%40roq-platform-saturn.iam.gserviceaccount.com%2F20221020%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20221020T071033Z&X-Goog-Expires=561600&X-Goog-SignedHeaders=host&response-content-disposition=inline%3B%20filename%3D%22Important%20Document%20%281%29-1666074994078.pdf%22&X-Goog-Signature=5b451431161baddd5243be16cc9cb820e0abdfeca11f92a5aadf36d78c48fefcf41309966ddf09591b60819fe56fe6ab9a4169dce5b0f564a55c4a9801bc5c679c4f42a9a504537e4d2f132f6d4db56033c6f498729d1701679f052aeae1c8e779f8fea387f5d0072cb033e73eb6b3b2ea3c521aa2172084dd535b133fe4b4a162a3ef21a10d800afa302c93738619c9d883ea6778712c97d8064c27836b96ccf090e166f333849ae0e4f8eb3f6638f521322ac7b9d08afea22699018eb15a0e9d90ec9f64a5921af0ea7ec2eeb4ade1dd5bdf2b1e52f3e1fb7f3e4117926fe5e268581a1e6012190dbf623cbfe3a377c8cc1bd7612114c5eb4a9547515ffc31',
      __typename: 'OrderFileModel',
    },
    {
      id: '8d3dbb0d-e031-4ea4-9532-34826f29edc8',
      name: 'Important Document (1)-1666074988247.pdf',
      url:
        'https://storage.googleapis.com/fbdaa685-d335-46f2-93a4-33ac4b4ef4ff-tenant-bucket/Important%20Document%20%281%29-1666074988247.pdf?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=sa-b2a38e48220deeffdff2%40roq-platform-saturn.iam.gserviceaccount.com%2F20221020%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20221020T071033Z&X-Goog-Expires=561600&X-Goog-SignedHeaders=host&response-content-disposition=inline%3B%20filename%3D%22Important%20Document%20%281%29-1666074988247.pdf%22&X-Goog-Signature=4bc0c85955e8d0311539f7a7c0a8864e2d802ea792cb7344dbd35729bd8d726c1ac75a6a164d1e24853919c1db139a99c22f2097f536e6c3c220e3f0ac77018457f21af2bd8493263cbb11a0519e2b7f4e0e243195f47e6df40fc440730b03254b131e0eb1913c8682c794dbfbdbebf5b64222fb837f065df0c279697fa001a80cdb5773c0e17f6a997c4baf8b4bce910f0bebb2aaa1cc768dad72818c54f3b08c6ab6f7f003bf427bbfbcfb9025f2b20c4f1f74fe930bdf560ecd0ea1aaca3c0cbf63cbb5ae5bdd8817cadad3c7a76a37ea614563a42e5121a77fdfeede5ba662d7c6991bdaa8d6466707126c2733ddf6a1625dcbd04254ad1f4e4b4ea391ce',
      __typename: 'OrderFileModel',
    },
  ],
  debtor: {
    id: 'f760cf57-17fb-4a92-ad64-deff96a4a2a5',
    name: 'Test Debto Camera',
    debtorReferenceId: 'Truckos_afa0a878-7985-4001-809d-23b29c649823',
    debtorStatus: 'VERIFIED',
    __typename: 'DebtorModel',
  },
  __typename: 'OrderModel',
};
