import styled from 'styled-components';
import { Checkbox, Button } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { BaseForm } from '@app/components/common/Forms/BaseForm/BaseForm';
import { Input as CommonInput } from '@app/components/common/Inputs/Input/Input';
import { InputPassword as CommonInputPassword } from '@app/components/common/Inputs/InputPassword/InputPassword';
import loginBackground from '@app/assets/images/login-bg.webp';
import { BORDER_RADIUS, FONT_SIZE, FONT_WEIGHT, media } from '@app/styles/themes/constants';

export const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
`;

export const BackgroundWrapper = styled.div`
    width: 100%;
    height: 100%;
    background-size: cover;
    position: relative;
`;

export const LoginWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`;

export const FormWrapper = styled.div`
    padding: 0.5rem;
    width: 31.75rem;
    overflow: auto;
    background-color: rgba(var(--background-rgb-color), 0.93);
    border-radius: ${BORDER_RADIUS};

    @media only screen and ${media.xs} {
        padding: 0.5rem 0.25rem;
        width: 100%;
        max-height: calc(100vh - 10rem);
    }

    @media only screen and ${media.md} {h
        padding: 0.5rem;
        width: 100%;
        max-height: calc(100vh - 10rem);
    }
`;

export const FormTitle = styled.div`
    color: var(--primary-color);

    @media only screen and ${media.xs} {
        margin-bottom: 0.625rem;
        font-size: ${FONT_SIZE.lg};
        font-weight: ${FONT_WEIGHT.bold};
        line-height: 1.5625rem;
    }

    @media only screen and ${media.md} {
        margin-bottom: 0.875rem;
        font-size: ${FONT_SIZE.xxl};
        font-weight: ${FONT_WEIGHT.bold};
        line-height: 1.9375rem;
    }

    @media only screen and ${media.xl} {
        margin-bottom: 0.9375rem;
        font-size: ${FONT_SIZE.xxxl};
        font-weight: ${FONT_WEIGHT.extraBold};
        line-height: 2.125rem;
    }
`;

export const FormCheckbox = styled(Checkbox)`
    display: flex;
    padding-left: 0.125rem;

    & .ant-checkbox-inner {
        border-radius: 3px;
        transform: scale(1.375);
    }

    & .ant-checkbox-input {
        transform: scale(1.375);
    }
`;

export const FormItem = styled(BaseForm.Item)`
    margin-bottom: 0.75rem;
    & .ant-form-item-control-input {
        min-height: 3.125rem;
    }

    & .ant-form-item-explain-error {
        font-size: ${FONT_SIZE.xs};
    }

    & label {
        color: var(--primary-color);
        font-size: ${FONT_SIZE.xs};
        line-height: 1.25rem;
    }

    &.ant-form-item-has-feedback .ant-input-affix-wrapper .ant-input-suffix {
        padding-right: 1.5rem;
    }
`;

export const FormInput = styled(CommonInput)`
    color: var(--text-main-color);
    background: transparent;

    & input.ant-input {
        background: transparent;
    }
`;

export const FormInputPassword = styled(CommonInputPassword)`
    color: var(--text-main-color);
    background: transparent;

    & input.ant-input {
        background: transparent;
    }
`;

export const ActionsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
`;

export const Text = styled.span`
    color: var(--text-main-color);
    font-size: ${FONT_SIZE.xs};
    font-weight: ${FONT_WEIGHT.regular};
`;

export const LinkText = styled(Text)`
    text-decoration: underline;
    color: var(--primary-color);
`;

export const SubmitButton = styled(Button)`
    font-size: ${FONT_SIZE.md};
    font-weight: ${FONT_WEIGHT.semibold};
    width: 100px;
    height: 35px;
`;

export const SocialButton = styled(Button)`
    font-size: ${FONT_SIZE.md};
    font-weight: ${FONT_WEIGHT.semibold};
    color: var(--primary-color);
    border: 1px solid var(--primary-color);
    width: 120px;
    margin-top: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
`;

export const FooterWrapper = styled.div`
    margin-top: 1.25rem;
    text-align: center;
`;

export const BackIcon = styled(LeftOutlined)`
    font-size: 0.75rem;
    margin-right: 0.75rem;
`;

export const BackWrapper = styled.div`
    font-size: ${FONT_SIZE.md};
    font-weight: ${FONT_WEIGHT.semibold};
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-bottom: 1.25rem;
`;

export const SocialIconWrapper = styled.div`
    display: flex;
    margin-right: 0.8125rem;
    @media only screen and ${media.xs} {
        margin-right: 0.625rem;
    }

    @media only screen and ${media.md} {
        margin-right: 0.8125rem;
    }
`;
