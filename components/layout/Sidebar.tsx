import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { Role } from '../../types';

const iconPaths = {
  dashboard: "M3 13.166V2.833A.833.833 0 013.833 2h16.334c.46 0 .833.373.833.833v10.333a.833.833 0 01-.833.834H3.833A.833.833 0 013 13.166zM3 15.833h18v5.334a.833.833 0 01-.833.833H3.833A.833.833 0 013 21.167v-5.334z",
  study_plan: "M15.5 2.833V1a.833.833 0 10-1.667 0v1.833A8.333 8.333 0 1012 20.333a8.333 8.333 0 003.5-17.5zm-3.5 15.834a6.667 6.667 0 110-13.334 6.667 6.667 0 010 13.334zM12.833 7.833H11.17V12h4.167v-1.667h-2.5v-2.5z",
  reports: "M18.833 2.833H5.167A2.167 2.167 0 003 5v14a2.167 2.167 0 002.167 2.167h13.666A2.167 2.167 0 0021 19V5a2.167 2.167 0 00-2.167-2.167zM8.5 17.333H6.833v-6.666H8.5v6.666zm3.333 0h-1.666V6.833h1.666v10.5zM15.167 17.333h-1.667v-4.166h1.667v4.166z",
  supervision: "M12 12.833c2.278 0 4.167-1.888 4.167-4.166S14.278 4.5 12 4.5s-4.167 1.888-4.167 4.167S9.722 12.833 12 12.833zM12 14.5c-2.778 0-8.333 1.389-8.333 4.167V20.5h16.666v-1.833c0-2.778-5.555-4.167-8.333-4.167z",
  profile: "M12 12.833a4.167 4.167 0 100-8.334 4.167 4.167 0 000 8.334zM12 14.5c-2.778 0-8.333 1.389-8.333 4.167V20.5h16.666v-1.833c0-2.778-5.555-4.167-8.333-4.167z",
  reporting: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",
  thesis: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
  milestones: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
};

type NavItemProps = {
  to: string;
  iconPath: string;
  label: string;
  isSidebarOpen: boolean;
};

const NavItem: React.FC<NavItemProps> = ({ to, iconPath, label, isSidebarOpen }) => (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `flex items-center p-3 my-1 rounded-lg transition-colors duration-200 ${ isSidebarOpen ? '' : 'justify-center' } ${
          isActive
            ? 'bg-primary-600 text-white shadow-lg'
            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
        }`
      }
    >
      <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d={iconPath} /></svg>
      <span className={`ml-4 font-medium whitespace-nowrap transition-all duration-300 overflow-hidden ${isSidebarOpen ? 'opacity-100' : 'opacity-0 w-0'}`}>{label}</span>
    </NavLink>
  );

const Sidebar: React.FC = () => {
    const { t } = useLanguage();
    const { user } = useAuth();
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className={`flex flex-col justify-between bg-gray-800 text-white transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
            <div>
                 <div className={`flex items-center p-4 border-b border-gray-700 ${isSidebarOpen ? 'justify-between' : 'justify-center'}`}>
                    <span className={`font-bold text-2xl text-white transition-all duration-300 font-serif overflow-hidden ${isSidebarOpen ? 'opacity-100' : 'opacity-0 w-0'}`}>PGRMS</span>
                    <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 rounded-lg hover:bg-gray-700">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                    </button>
                </div>
                <nav className="mt-6 px-3">
                    <NavItem to="/" iconPath={iconPaths.dashboard} label={t('dashboard')} isSidebarOpen={isSidebarOpen} />
                    
                    {user.role === Role.Student && (
                        <>
                            <NavItem to="/study-plan" iconPath={iconPaths.study_plan} label={t('study_plan')} isSidebarOpen={isSidebarOpen} />
                            <NavItem to="/milestones" iconPath={iconPaths.milestones} label={t('milestones')} isSidebarOpen={isSidebarOpen} />
                            <NavItem to="/supervision" iconPath={iconPaths.supervision} label={t('supervision')} isSidebarOpen={isSidebarOpen} />
                            <NavItem to="/thesis" iconPath={iconPaths.thesis} label={t('thesis_submission')} isSidebarOpen={isSidebarOpen} />
                        </>
                    )}
                     
                    {user.role === Role.Supervisor && (
                        <>
                           <NavItem to="/milestones" iconPath={iconPaths.milestones} label={t('milestones')} isSidebarOpen={isSidebarOpen} />
                        </>
                    )}

                    {(user.role === Role.Admin || user.role === Role.HOD) && (
                        <NavItem to="/reporting" iconPath={iconPaths.reporting} label={t('reporting')} isSidebarOpen={isSidebarOpen} />
                    )}

                    <NavItem to="/profile" iconPath={iconPaths.profile} label={t('profile')} isSidebarOpen={isSidebarOpen} />
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;