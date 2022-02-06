import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import lockFill from '@iconify/icons-eva/lock-fill';
import personAddFill from '@iconify/icons-eva/person-add-fill';
import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';
import roundTask from '@iconify/icons-ic/round-task';
import folderAddFilled from '@iconify/icons-ant-design/folder-add-filled';
import areaChartOutlined from '@iconify/icons-ant-design/area-chart-outlined';
import roundDashboard from '@iconify/icons-ic/round-dashboard';
import roundGrading from '@iconify/icons-ic/round-grading';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon(roundDashboard)
  },
  {
    title: 'definitions',
    path: '/dashboard/user',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'clients',
    path: '/dashboard/clients',
    icon: getIcon(peopleFill)
  },
  {
    title: 'folders',
    path: '/dashboard/folders',
    icon: getIcon(folderAddFilled)
  },
  {
    title: 'account activities',
    path: '/dashboard/accountActivities',
    icon: getIcon(areaChartOutlined)
  },
  {
    title: 'tasks',
    path: '/dashboard/tasks',
    icon: getIcon(roundTask)
  },
  {
    title: 'documents',
    path: '/dashboard/documents',
    icon: getIcon(fileTextFill)
  }
];

export default sidebarConfig;
