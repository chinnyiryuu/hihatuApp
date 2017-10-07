export class Util {
    /**
     * 解析性别
     * 0:女性
     * 1:男性
     * @param gender 
     */
    public static parseGender(gender: string) {
        let result = '';
        switch (gender) {
            case '0':
                result = '女性';
                break;
            case '1':
                result = '男性';
                break;
            default:
                break;
        }
        return result;
    }

    /**
     * 日期格式化
     * YYYY年MM月DD日
     * @param date 
     */
    public static formatDate(date: string) {
        let result = '';
        try {
            let d = new Date(date);
            result = d.getFullYear() + '年' + (d.getMonth() + 1) + '月' + d.getDate() + '日';
        } catch (error) {

        }
        return result;
    }
}