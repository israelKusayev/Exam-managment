// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const baseApi = 'http://localhost:3000';
export const environment = {
  production: false,
  authUrl: baseApi + '/api/auth',
  testsAdminUrl: baseApi + '/api/test-admin',
  testsUserUrl: baseApi + '/api/test-user',
  questionsUrl: baseApi + '/api/questions',
  answersUrl: baseApi + '/api/answers',
  languageUrl: baseApi + '/api/language',
  certificateUrl: baseApi + '/api/certificates',
  organizationUrl: baseApi + '/api/organization',
  subjectUrl: baseApi + '/api/subject',
  currentUserStorageKey: 'currentUser',
  tokenStorageKey: 'token',

  auth_headerKey: 'x-auth-token'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
