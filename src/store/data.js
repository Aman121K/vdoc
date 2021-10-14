import { ABOUT_US, CONTACT_US } from "../routes/constants";

// interface Link {
//     path: string,
//     text: string
// }

// interface Footer {
//     leftLinks: Link[];
//     rightLinks: Link[];
// }

export const footerLinks = {
    leftLinks: [
        { path: '/', text: 'VDoc' },
        { path: ABOUT_US, text: 'ABOUT US' },
        { path: CONTACT_US, text: 'CONTACT US' }
    ],
    rightLinks: [
        { path: '/', text: '© 2021 VDoc LLC.' }
    ]
}
