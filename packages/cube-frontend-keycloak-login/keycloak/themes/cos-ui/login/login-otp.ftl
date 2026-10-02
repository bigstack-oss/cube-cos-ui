<#import "template.ftl" as layout>
<@layout.registrationLayout displayMessage=!messagesPerField.existsError('totp'); section>
    <#if section = "form">
        <script>
            window.keycloakLoginContext = {
                pageId: 'login-otp',
                resourcesPath: '${url.resourcesPath}',
                formActionUrl: '${url.loginAction?js_string?no_esc}',
                message: <#if !messagesPerField.existsError('totp') && message?has_content && (message.type != 'warning' || !isAppInitiatedAction??)>{ type: '${message.type?js_string?no_esc}', summary: '${message.summary?js_string?no_esc}' }<#else>undefined</#if>,
                otpCredentials: [<#list otpLogin.userOtpCredentials as otpCredential>{ id: '${otpCredential.id?js_string?no_esc}', userLabel: '${(otpCredential.userLabel!'')?js_string?no_esc}' }<#sep>, </#sep></#list>],
                selectedCredentialId: <#if otpLogin.selectedCredentialId?has_content>'${otpLogin.selectedCredentialId?js_string?no_esc}'<#else>undefined</#if>,
                otpError: <#if messagesPerField.existsError('totp')>'${messagesPerField.get('totp')?js_string?no_esc}'<#else>undefined</#if>
            }
        </script>
        <div id="kc-form-wrapper" style="height: 100%;"></div>
    </#if>
</@layout.registrationLayout>
