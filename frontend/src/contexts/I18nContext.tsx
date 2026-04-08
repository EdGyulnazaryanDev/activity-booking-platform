import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Lang = 'en' | 'hy';

const en = {
  // Nav
  home: 'Home', activities: 'Activities', myBookings: 'My Bookings',
  notifications: 'Notifications', wallet: '💳 Wallet', profile: 'Profile',
  logout: 'Logout', signUp: 'Sign Up', login: 'Login',
  dashboard: 'Dashboard', manage: 'Manage', reports: 'Reports',
  // Profile
  profileSettings: 'Profile Settings', fullName: 'Full Name', email: 'Email',
  currentPassword: 'Current Password', newPassword: 'New Password',
  saveChanges: 'Save Changes', saving: 'Saving…', language: 'Language',
  accountInfo: 'Account Info', security: 'Security', memberSince: 'Member since', role: 'Role',
  profileUpdated: 'Profile updated!', updateFailed: 'Update failed',
  // Auth
  signInTitle: 'Sign in to your account', createAccount: 'Create account',
  alreadyHaveAccount: 'Already have one?', signIn: 'Sign in', signingIn: 'Signing in…',
  loginFailed: 'Login failed. Please try again.', registrationFailed: 'Registration failed',
  creatingAccount: 'Creating account…', yourName: 'Your name',
  enterEmail: 'Enter your email', enterPassword: 'Enter your password',
  createPassword: 'Create a password', orCreateAccount: 'create a new account',
  // Home
  heroTitle: 'Book Your Next Activity', heroSubtitle: 'Courts, studios, equipment — all in one platform',
  searchPlaceholder: 'Search courts, rooms, equipment…', courts: '🎾 Courts',
  rooms: '🏠 Rooms', equipment: '🎿 Equipment', availableResources: 'Available Resources',
  viewAll: 'View all →', noResourcesFound: 'No resources found',
  unitsAvailable: 'units available', exclusiveBooking: 'Exclusive booking',
  bookNow: 'Book Now', readyToBook: 'Ready to book?',
  joinPlatform: 'Join the platform and reserve your spot today', browseResources: 'Browse Resources',
  // Activities
  bookAResource: 'Book a Resource', courtsRoomsEquipment: 'Courts, rooms, and equipment — all in one place',
  searchResources: 'Search resources…', singleUnitBooking: 'Single-unit booking',
  viewAndBook: 'View & Book', upTo: 'Up to',
  // Activity Detail
  backToResources: 'Back to resources', available: 'Available', unavailable: 'Unavailable',
  singleUnitExclusive: 'Single unit (exclusive booking)', hourlyBooking: 'Hourly booking',
  pricing: 'Pricing', perHour: '/hr', bookThisResource: 'Book this resource',
  date: 'Date', start: 'Start', end: 'End', quantityMax: 'Quantity (max',
  notesOptional: 'Notes (optional)', openForPartners: 'Open for partner matching',
  booking: 'Booking…', mustBeLoggedIn: 'You must be logged in to book',
  // Bookings
  noBooksYet: 'No bookings yet', browseResourcesLink: 'Browse resources',
  waitingApproval: "Waiting for admin approval — you'll be notified once reviewed.",
  approvedAllSet: "Approved — you're all set!", bookingRejected: 'Booking was rejected. Please contact support.',
  // Admin Dashboard
  adminDashboard: 'Admin Dashboard', autoRefreshes: 'Auto-refreshes every 15s · Last updated',
  live: 'Live', pending: 'Pending', approved: 'Approved', paid: 'Paid',
  rejected: 'Rejected', upcoming: 'Upcoming', bookingCalendar: 'Booking Calendar',
  today: 'Today', allBookings: 'All Bookings', resource: 'Resource', user: 'User',
  dateTime: 'Date & Time', qty: 'Qty', price: 'Price', staff: 'Staff',
  status: 'Status', actions: 'Actions', noBookingsFound: 'No bookings found',
  // Admin Manage
  adminManage: 'Admin — Manage', addResource: '+ Add Resource', loading: 'Loading…',
  deactivate: 'Deactivate', activate: 'Activate', addResourceTitle: 'Add Resource',
  nameStar: 'Name *', typeStar: 'Type *', capacityStar: 'Capacity *',
  court: 'Court', room: 'Room', quantifiable: 'Quantifiable (multiple units, e.g. PCs, bikes)',
  creating: 'Creating…', create: 'Create', cancel: 'Cancel',
  pricingRules: 'Pricing Rules', addRule: '+ Add Rule', noPricingRules: 'No pricing rules yet',
  addStaff: '+ Add Staff', emailStar: 'Email *', specialty: 'Specialty', phone: 'Phone',
  active: 'Active', inactive: 'Inactive', delete: 'Delete', addStaffTitle: 'Add Staff',
  addUser: '+ Add User', name: 'Name', joined: 'Joined', passwordStar: 'Password *',
  addUserTitle: 'Add User', userRole: 'User', adminRole: 'Admin',
  paymentHistory: 'Payment History', searchPayments: 'Search by user or resource…',
  totalRevenue: 'Total Revenue', paidBookings: 'Paid Bookings', reservationTime: 'Reservation Time',
  paidAt: 'Paid At', method: 'Method', amount: 'Amount', noPaymentsFound: 'No payments found',
  // Wallet
  myWallet: 'My Wallet', availableBalance: 'Available Balance', topUp: '+ Top Up',
  payViaIdram: '��🇲 Pay via IDram', awaitingPayment: 'Approved — Awaiting Payment',
  noPendingPayments: 'No pending payments 🎉', pay: 'Pay',
  transactionHistory: 'Transaction History', type: 'Type', reservation: 'Reservation',
  noTransactions: 'No transactions yet', payForBooking: 'Pay for Booking',
  selectPaymentMethod: 'Select payment method:', payInstantly: 'Pay instantly from your balance',
  idramDesc: 'Armenian e-wallet — redirects to IDram payment page',
  telcellDesc: 'Telcell wallet payment', cashDesc: 'Pay at the venue — admin will confirm',
  bankDesc: 'Transfer to our account — admin confirms', comingSoon: '(coming soon)',
  balance: 'Balance:', insufficient: '— insufficient', confirmPayment: 'Confirm Payment',
  processing: 'Processing…',
  // Reports
  monthlyReports: 'Monthly Reports', avgValue: 'Avg Value', revenueOverview: 'Revenue Overview',
  revenueByResource: 'Revenue by Resource', noPaidBookings: 'No paid bookings this month',
  dailyRevenue: 'Daily Revenue', noRevenue: 'No revenue this month', paymentMethods: 'Payment Methods',
  // Notifications
  unread: 'unread', showAll: 'Show all', unreadOnly: 'Unread only', markAllRead: 'Mark all read',
  pushNotifications: 'Get push notifications on your phone',
  ntfyDesc: 'Install the ntfy app (free, iOS & Android) and subscribe to the topic below.',
  ntfyTopic: 'Topic:', ntfyCopy: '📋', ntfyOpen: 'Open ↗',
  ntfyInstructions: 'In the ntfy app: tap "+" → paste the topic → subscribe.',
  noNotifications: 'No notifications yet', markAsRead: '✓',
};

const hy: typeof en = {
  home: 'Գլխավոր', activities: 'Ակտիվություններ', myBookings: 'Իմ ամրագրումները',
  notifications: 'Ծանուցումներ', wallet: '💳 Դրամապանակ', profile: 'Պրոֆիլ',
  logout: 'Ելք', signUp: 'Գրանցվել', login: 'Մուտք',
  dashboard: 'Վահանակ', manage: 'Կառավարել', reports: 'Հաշվետվություններ',
  profileSettings: 'Պրոֆիլի կարգավորումներ', fullName: 'Անուն Ազգանուն', email: 'Էլ. փոստ',
  currentPassword: 'Ընթացիկ գաղտնաբառ', newPassword: 'Նոր գաղտնաբառ',
  saveChanges: 'Պահպանել', saving: 'Պահպանվում է…', language: 'Լեզու',
  accountInfo: 'Հաշվի տվյալներ', security: 'Անվտանգություն', memberSince: 'Անդամ է', role: 'Դեր',
  profileUpdated: 'Պրոֆիլը թարմացվել է!', updateFailed: 'Թարմացումը ձախողվեց',
  signInTitle: 'Մուտք գործել հաշիվ', createAccount: 'Ստեղծել հաշիվ',
  alreadyHaveAccount: 'Արդեն ունե՞ք:', signIn: 'Մուտք', signingIn: 'Մուտք գործում…',
  loginFailed: 'Մուտքը ձախողվեց։ Կրկին փորձեք:', registrationFailed: 'Գրանցումը ձախողվեց',
  creatingAccount: 'Ստեղծվում է…', yourName: 'Ձեր անունը',
  enterEmail: 'Մուտքագրեք էլ. փոստ', enterPassword: 'Մուտքագրեք գաղտնաբառ',
  createPassword: 'Ստեղծեք գաղտնաբառ', orCreateAccount: 'ստեղծել նոր հաշիվ',
  heroTitle: 'Ամրագրեք Ձեր Հաջորդ Ակտիվությունը', heroSubtitle: 'Կորտեր, ստուդիաներ, սարքավորումներ — մեկ հարթակում',
  searchPlaceholder: 'Որոնել կորտ, սենյակ, սարքավորում…', courts: '🎾 Կորտեր',
  rooms: '🏠 Սենյակներ', equipment: '🎿 Սարքավորումներ', availableResources: 'Հասանելի ռեսուրսներ',
  viewAll: 'Տեսնել բոլորը →', noResourcesFound: 'Ռեսուրսներ չեն գտնվել',
  unitsAvailable: 'միավոր հասանելի', exclusiveBooking: 'Բացառիկ ամրագրում',
  bookNow: 'Ամրագրել', readyToBook: 'Պատրա՞ստ եք ամրագրել:',
  joinPlatform: 'Միացեք հարթակին և ամրագրեք Ձեր տեղը', browseResources: 'Դիտել ռեսուրսները',
  bookAResource: 'Ամրագրել ռեսուրս', courtsRoomsEquipment: 'Կորտեր, սենյակներ, սարքավորումներ — մեկ տեղում',
  searchResources: 'Որոնել ռեսուրսներ…', singleUnitBooking: 'Մեկ միավոր ամրագրում',
  viewAndBook: 'Դիտել և ամրագրել', upTo: 'Մինչև',
  backToResources: 'Վերադառնալ ռեսուրսներ', available: 'Հասանելի', unavailable: 'Անհասանելի',
  singleUnitExclusive: 'Մեկ միավոր (բացառիկ)', hourlyBooking: 'Ժամային ամրագրում',
  pricing: 'Գնագոյացում', perHour: '/ժ', bookThisResource: 'Ամրագրել ռեսուրսը',
  date: 'Ամսաթիվ', start: 'Սկիզբ', end: 'Ավարտ', quantityMax: 'Քանակ (առավելագույն',
  notesOptional: 'Նշումներ (կամընտիր)', openForPartners: 'Բաց գործընկերային համընկնման համար',
  booking: 'Ամրագրվում…', mustBeLoggedIn: 'Ամրագրելու համար պետք է մուտք գործել',
  noBooksYet: 'Ամրագրումներ դեռ չկան', browseResourcesLink: 'Դիտել ռեսուրսները',
  waitingApproval: 'Սպասվում է ադմինի հաստատումը — ծանուցում կստանաք:',
  approvedAllSet: 'Հաստատված — ամեն ինչ պատրաստ է!', bookingRejected: 'Ամրագրումը մերժվել է: Կապ հաստատեք աջակցության հետ:',
  adminDashboard: 'Ադմինի վահանակ', autoRefreshes: 'Ավտոթարմացում 15 վ-ն մեկ · Վերջին թարմացում',
  live: 'Ուղիղ', pending: 'Սպասվում է', approved: 'Հաստատված', paid: 'Վճարված',
  rejected: 'Մերժված', upcoming: 'Առաջիկա', bookingCalendar: 'Ամրագրումների օրացույց',
  today: 'Այսօր', allBookings: 'Բոլոր ամրագրումները', resource: 'Ռեսուրս', user: 'Օգտատեր',
  dateTime: 'Ամսաթիվ և ժամ', qty: 'Քանակ', price: 'Գին', staff: 'Անձնակազմ',
  status: 'Կարգավիճակ', actions: 'Գործողություններ', noBookingsFound: 'Ամրագրումներ չեն գտնվել',
  adminManage: 'Ադմին — Կառավարում', addResource: '+ Ավելացնել ռեսուրս', loading: 'Բեռնվում է…',
  deactivate: 'Ապաակտիվացնել', activate: 'Ակտիվացնել', addResourceTitle: 'Ավելացնել ռեսուրս',
  nameStar: 'Անուն *', typeStar: 'Տեսակ *', capacityStar: 'Հզորություն *',
  court: 'Կորտ', room: 'Սենյակ', quantifiable: 'Քանակային (բազմաթիվ միավոր, օր.՝ ԱՀ, հեծանիվ)',
  creating: 'Ստեղծվում է…', create: 'Ստեղծել', cancel: 'Չեղարկել',
  pricingRules: 'Գնային կանոններ', addRule: '+ Ավելացնել կանոն', noPricingRules: 'Գնային կանոններ չկան',
  addStaff: '+ Ավելացնել անձնակազմ', emailStar: 'Էլ. փոստ *', specialty: 'Մասնագիտություն', phone: 'Հեռախոս',
  active: 'Ակտիվ', inactive: 'Ոչ ակտիվ', delete: 'Ջնջել', addStaffTitle: 'Ավելացնել անձնակազմ',
  addUser: '+ Ավելացնել օգտատեր', name: 'Անուն', joined: 'Միացել է', passwordStar: 'Գաղտնաբառ *',
  addUserTitle: 'Ավելացնել օգտատեր', userRole: 'Օգտատեր', adminRole: 'Ադմին',
  paymentHistory: 'Վճարումների պատմություն', searchPayments: 'Որոնել ըստ օգտատիրոջ կամ ռեսուրսի…',
  totalRevenue: 'Ընդհանուր եկամուտ', paidBookings: 'Վճարված ամրագրումներ', reservationTime: 'Ամրագրման ժամ',
  paidAt: 'Վճարվել է', method: 'Եղանակ', amount: 'Գումար', noPaymentsFound: 'Վճարումներ չեն գտնվել',
  myWallet: 'Իմ դրամապանակը', availableBalance: 'Հասանելի մնացորդ', topUp: '+ Համալրել',
  payViaIdram: '🇦🇲 Վճարել IDram-ով', awaitingPayment: 'Հաստատված — Սպասում է վճարման',
  noPendingPayments: 'Ընդհանուր վճարումներ չկան 🎉', pay: 'Վճարել',
  transactionHistory: 'Գործարքների պատմություն', type: 'Տեսակ', reservation: 'Ամրագրում',
  noTransactions: 'Գործարքներ դեռ չկան', payForBooking: 'Վճարել ամրագրման համար',
  selectPaymentMethod: 'Ընտրեք վճարման եղանակ:', payInstantly: 'Վճարեք անմիջապես մնացորդից',
  idramDesc: 'Հայկական էլ. դրամապանակ — վերահղում IDram-ի էջ',
  telcellDesc: 'Telcell դրամապանակ', cashDesc: 'Վճարեք վայրում — ադմինը կհաստատի',
  bankDesc: 'Փոխանցեք մեր հաշվին — ադմինը կհաստատի', comingSoon: '(շուտով)',
  balance: 'Մնացորդ:', insufficient: '— անբավարար', confirmPayment: 'Հաստատել վճարումը',
  processing: 'Մշակվում է…',
  monthlyReports: 'Ամսական հաշվետվություններ', avgValue: 'Միջ. արժեք', revenueOverview: 'Եկամուտների ակնարկ',
  revenueByResource: 'Եկամուտ ըստ ռեսուրսի', noPaidBookings: 'Վճարված ամրագրումներ չկան',
  dailyRevenue: 'Օրական եկամուտ', noRevenue: 'Եկամուտ չկա', paymentMethods: 'Վճարման եղանակներ',
  unread: 'չկարդացած', showAll: 'Ցույց տալ բոլորը', unreadOnly: 'Չկարդացածները', markAllRead: 'Նշել բոլորը կարդացած',
  pushNotifications: 'Ստացեք push ծանուցումներ հեռախոսում',
  ntfyDesc: 'Տեղադրեք ntfy հավելվածը (անվճար, iOS & Android) և բաժանորդագրվեք ստորև թեմային:',
  ntfyTopic: 'Թեմա:', ntfyCopy: '📋', ntfyOpen: 'Բացել ↗',
  ntfyInstructions: 'ntfy հավելվածում: հպեք "+" → տեղադրեք թեման → բաժանորդագրվեք:',
  noNotifications: 'Ծանուցումներ դեռ չկան', markAsRead: '✓',
};

type TranslationKey = keyof typeof en;
interface I18nContextType { lang: Lang; setLang: (l: Lang) => void; t: (key: TranslationKey) => string; }
const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Lang>(() => (localStorage.getItem('lang') as Lang) ?? 'en');
  function setLang(l: Lang) { setLangState(l); localStorage.setItem('lang', l); }
  function t(key: TranslationKey): string { return (lang === 'hy' ? hy : en)[key] ?? key; }
  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
};
