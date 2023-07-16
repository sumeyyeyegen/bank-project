import React, { FC, useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import Tabs from '@mui/material/Tabs';
import TabPanel from '@mui/lab/TabPanel';
import CreditInterest from './CreditInterest';
import DepositInterest from './DepositInterest';


const InterestTabs = ({ allBankList }: any) => {

  const [value, setValue] = useState("1");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <TabContext value={value}>
      <Box sx={{ borderBottom: 3, borderColor: 'yellow' }}>
        <Tabs value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          sx={{ paddingBottom: 1 }}
          aria-label="secondary tabs example">
          <Tab label="Kredi Faizi" value="1" />
          <Tab label="Mevduat Faizi" value="2" />
        </Tabs>
      </Box>
      <TabPanel value="1">
        <CreditInterest allBankList={allBankList} />
      </TabPanel>
      <TabPanel value="2">
        <DepositInterest />
      </TabPanel>
    </TabContext>
  )
}

export default InterestTabs