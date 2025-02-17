<#import "template.ftl" as layout>
<@layout.registrationLayout displayMessage=!messagesPerField.existsError('username','password') displayInfo=realm.password && realm.registrationAllowed && !registrationDisabled??; section>
    <#if section = "form">
        <script>
            window.keycloakLoginContext = {
                resourcesPath: '${url.resourcesPath}',
                incorrectCredentials: ${messagesPerField.existsError('username','password')?c},
                sessionTimedOut: <#if message?has_content && message.type == 'error' && message.summary?contains('timed out')>true<#else>false</#if>,
                // Remove all `amp;` because the `actionUrl` retrieved from FreeMarker has `amp;` after every `&` character.
                formActionUrl: '${url.loginAction}'.replace(/amp;/g, ''),
                authSelectedCredentials: <#if auth.selectedCredential?has_content>"${auth.selectedCredential}"<#else>undefined</#if>,
                loginGreeting: '${properties.loginGreeting?js_string?no_esc}',
            }
        </script>
        <div id="kc-form-wrapper" style="height: 100%;"></div>
    </#if>
</@layout.registrationLayout>
