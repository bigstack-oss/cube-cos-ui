<#import "template.ftl" as layout>
<@layout.registrationLayout displayMessage=!messagesPerField.existsError('password','password-confirm'); section>
    <#if section = "form">
        <script>
            window.keycloakLoginContext = {
                pageId: 'login-update-password',
                resourcesPath: '${url.resourcesPath}',
                formActionUrl: '${url.loginAction?js_string?no_esc}',
                message: <#if !messagesPerField.existsError('password','password-confirm') && message?has_content && (message.type != 'warning' || !isAppInitiatedAction??)>{ type: '${message.type?js_string?no_esc}', summary: '${message.summary?js_string?no_esc}' }<#else>undefined</#if>,
                username: '${(username!'')?js_string?no_esc}',
                isAppInitiatedAction: ${(isAppInitiatedAction??)?c},
                passwordError: <#if messagesPerField.existsError('password')>'${messagesPerField.get('password')?js_string?no_esc}'<#else>undefined</#if>,
                passwordConfirmError: <#if messagesPerField.existsError('password-confirm')>'${messagesPerField.get('password-confirm')?js_string?no_esc}'<#else>undefined</#if>
            }
        </script>
        <div id="kc-form-wrapper" style="height: 100%;"></div>
    </#if>
</@layout.registrationLayout>
