import {SidebarNavigationItem} from '@app/components/layouts/main/sider/sidebarNavigation'
export interface UserStore {
    data: any,
}

export interface UserData {
    modified_at: string;
    id: string;
    uploadTimeStr: string;
    createTime: string;
    birthday: string;
    sex: "Female" | "Male";
    downloadable: boolean;
    accountNo: string;
    created_at: string;
    fileSize: string;
    name: string;
    phone: string;
    status: boolean;
    user_id: string;
  }