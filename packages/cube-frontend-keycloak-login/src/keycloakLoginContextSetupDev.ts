if (import.meta.env.DEV) {
  window.keycloakLoginContext = {
    resourcesPath: '/resources',
    incorrectCredentials: false,
    sessionTimedOut: false,
    formActionUrl:
      'http://localhost:8642/auth/realms/master/login-actions/authenticate?session_code=a6ESSp_K4BexArNGC3-vShOEDcO79tvomSu8SJrN8_k&execution=336de572-f999-43b8-af68-961e86711af7&client_id=security-admin-console&tab_id=AQCFEittHgs',
    authSelectedCredentials: undefined,
    loginGreeting: '',
  }
}
