<#import "template.ftl" as layout>
<@layout.registrationLayout displayMessage=!messagesPerField.existsError('totp','userLabel'); section>
    <#if section = "form">
        <script>
            window.keycloakLoginContext = {
                pageId: 'login-config-totp',
                resourcesPath: '${url.resourcesPath}',
                formActionUrl: '${url.loginAction?js_string?no_esc}',
                message: <#if !messagesPerField.existsError('totp','userLabel') && message?has_content && (message.type != 'warning' || !isAppInitiatedAction??)>{ type: '${message.type?js_string?no_esc}', summary: '${message.summary?js_string?no_esc}' }<#else>undefined</#if>,
                mode: <#if mode??>'${mode?js_string?no_esc}'<#else>undefined</#if>,
                supportedApplications: [<#list totp.supportedApplications as app>'${msg(app)?js_string?no_esc}'<#sep>, </#sep></#list>],
                totpSecret: '${totp.totpSecret?js_string?no_esc}',
                totpSecretEncoded: '${totp.totpSecretEncoded?js_string?no_esc}',
                totpSecretQrCode: '${totp.totpSecretQrCode?js_string?no_esc}',
                manualUrl: '${totp.manualUrl?js_string?no_esc}',
                qrUrl: '${totp.qrUrl?js_string?no_esc}',
                policy: {
                    type: '${totp.policy.type?js_string?no_esc}',
                    algorithm: '${totp.policy.getAlgorithmKey()?js_string?no_esc}',
                    digits: ${totp.policy.digits?c},
                    period: ${totp.policy.period?c},
                    initialCounter: ${totp.policy.initialCounter?c}
                },
                isUserLabelRequired: ${(totp.otpCredentials?size gte 1)?c},
                isAppInitiatedAction: ${(isAppInitiatedAction??)?c},
                totpError: <#if messagesPerField.existsError('totp')>'${messagesPerField.get('totp')?js_string?no_esc}'<#else>undefined</#if>,
                userLabelError: <#if messagesPerField.existsError('userLabel')>'${messagesPerField.get('userLabel')?js_string?no_esc}'<#else>undefined</#if>
            }
        </script>
        <div id="kc-form-wrapper" style="height: 100%;"></div>
    </#if>
</@layout.registrationLayout>
