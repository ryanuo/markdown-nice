import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface UserInfo {
  [key: string]: unknown
}

export interface UserRepo {
  [key: string]: unknown
}

export const useUserInfoStore = defineStore('userInfo', () => {
  const userInfo = ref<UserInfo>({})
  const userRepo = ref<UserRepo[]>([])

  function setUserInfo(value: UserInfo) {
    userInfo.value = value
  }

  function setUserRepo(value: UserRepo[]) {
    userRepo.value = value
  }

  return { userInfo, userRepo, setUserInfo, setUserRepo }
})
